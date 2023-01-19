import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useDebounce } from "ahooks";
import {
  Avatar,
  Button,
  Drawer,
  List,
  message,
  Radio,
  Select,
  Space,
  Spin,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecipients,
  addSigntoSigner,
  changeRole,
  removeRecipients,
} from "../../features/sign/request-from-others.slice";
import documents from "../services/documents";
import { isEmpty } from "@/lib/client-utils";

const ListRecipients = ({
  recipients,
  handleRemoveRecipients,
  handleChangeRole,
  handleAddSign,
}) => {
  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={recipients}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              type="danger"
              onClick={() => handleRemoveRecipients(item.id)}
              icon={<DeleteOutlined />}
              size="small"
            />,
            <Radio.Group
              size="small"
              defaultValue={item?.role}
              onChange={() => handleChangeRole(item.id)}
            >
              <Radio.Button value={"reviewer"}>Reviewer</Radio.Button>
              <Radio.Button value={"signer"}>Signer</Radio.Button>
            </Radio.Group>,
            <div>
              {item?.role === "signer" && (
                <Button
                  onClick={() =>
                    handleAddSign({
                      ...item,
                      frame: {
                        height: 175,
                        width: 350,
                        translate: [0, 0, 0],
                      },
                      userId: item.id,
                    })
                  }
                  size="small"
                  type="primary"
                >
                  sign
                </Button>
              )}
            </div>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item?.fileDiri?.foto} />}
            title={`${item?.nama} (${item?.role})`}
            description={item?.nip}
          />
        </List.Item>
      )}
    />
  );
};

const ShareAndRequest = () => {
  const data = useSelector((state) => state.requestFromOthers);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(undefined);
  const debouncFilter = useDebounce(searching, 500);
  const [user, setUser] = useState(undefined);

  const [showDrawer, setShowDrawer] = useState(false);

  const router = useRouter();

  // untuk menghandle membuat recipients
  const recipientsMutation = useMutation(
    (data) => documents.createRecipients(data),
    {
      onSettled: () => {},
      onError: (error) => {},
      onSuccess: () => {},
    }
  );

  const handleRemoveRecipients = (id) => {
    dispatch(removeRecipients(id));
  };

  const handleChangeRole = (id) => {
    dispatch(changeRole(id));
  };

  const handleAddSign = (data) => {
    dispatch(addSigntoSigner(data));
  };

  const { data: employeeData, isLoading: loadingEmployee } = useQuery(
    ["employees", debouncFilter],
    () => documents.findEmployee(debouncFilter),
    { enabled: Boolean(debouncFilter) }
  );

  // this fucking multiple request like shit
  const handleChange = async (id) => {
    try {
      setUser(employeeData);
    } catch (error) {
      message.error("Hmmmmm... theres something error");
    }
  };

  const handleSubmit = async () => {
    // first thing you must get the document id and looping throung the users / the recipients
    const { dataSign, dataUser, documentData } = data;

    const { id: documentId } = documentData;

    const users = dataUser.map((user) => ({
      id: user?.id,
      userId: user?.pegawai_id,
      nama: user?.nama,
      role: user?.role,
    }));

    const signs = dataSign.map((sign) => {
      const { frame, page, id, userId } = sign;
      const [x, y] = frame.translate;
      const { height, width } = frame;

      const xPos = x < 0 ? 0 : x;
      const yPos = y < 0 ? 0 : y;

      return {
        xPos,
        yPos,
        height,
        width,
        page,
        id,
        employee_id: userId,
        userId,
      };
    });

    const currentDataPost = users.map((user, index) => {
      const properties = signs.filter((sign) => sign.userId === user.id);

      // fucking serialize this data
      const sign_coordinate = properties?.map((prop) => ({
        xPos: prop?.xPos,
        yPos: prop?.yPos,
        width: prop?.width,
        height: prop?.height,
        page: prop?.page,
      }));

      const total_sign_pages = properties?.length;
      const sign_pages = sign_coordinate?.map((s) => s?.page);

      // kalau user itu merupakan reviewer dinullkan
      return {
        sequence: index + 1,
        role: user?.role,
        signatory_status: "in progress",
        status: "on progress",
        employee_id: user?.userId,
        sign_pages: user?.role === "reviewer" ? null : sign_pages,
        sign_coordinate: user?.role == "reviewer" ? null : sign_coordinate,
        total_sign_pages: user?.role === "reviewer" ? null : total_sign_pages,
      };
    });

    // cek dulu
    const signerWithZeroProperty = currentDataPost.filter(
      (user) => user?.role === "signer" && user?.properties?.length === 0
    );

    if (signerWithZeroProperty?.length > 0 || dataUser?.length === 0) {
      message.error(
        "Ada signer yang memiliki properti kosong atau tidak ada yang dientri"
      );
    } else {
      const data = { documentId, data: currentDataPost };
      await recipientsMutation.mutateAsync(data);
      router.push(`/documents/${documentId}/view`);
      // send this to backend server
    }
  };

  return (
    <div>
      <Button
        icon={<PlusCircleFilled />}
        onClick={() => setShowDrawer(true)}
        type="primary"
      >
        Recipients
      </Button>
      <Drawer
        width={800}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        extra={
          <Space>
            <Button
              loading={recipientsMutation.isLoading}
              type="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Select
          size="small"
          style={{ width: "80%" }}
          placeholder="Employee number"
          defaultActiveFirstOption={false}
          showSearch
          notFoundContent={loadingEmployee ? <Spin size="small" /> : null}
          loading={loadingEmployee}
          showArrow={false}
          filterOption={false}
          onSearch={(e) => setSearching(e)}
          onChange={handleChange}
        >
          {!isEmpty(employeeData) && (
            <Select.Option key={employeeData?.nip}>
              <Space>
                {employeeData.nama} - {employeeData.nip}
              </Space>
            </Select.Option>
          )}
        </Select>
        <Button
          size="small"
          onClick={() => dispatch(addRecipients(user))}
          disabled={loadingEmployee || !employeeData}
        >
          Add
        </Button>
        {data?.dataUser.length ? (
          <div style={{ width: "70%" }}>
            <ListRecipients
              recipients={data?.dataUser}
              handleRemoveRecipients={handleRemoveRecipients}
              handleChangeRole={handleChangeRole}
              handleAddSign={handleAddSign}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default ShareAndRequest;
