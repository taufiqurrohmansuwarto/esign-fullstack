import {
  addRecipients,
  addSigntoSigner,
  changeRole,
  removeRecipients,
} from "@/features/request-from-others.slice";
import { isEmpty } from "@/lib/client-utils";
import {
  findRecipients,
  requestFromOthersAddRecipients,
} from "@/services/users.services";
import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "ahooks";
import {
  Avatar,
  Button,
  Drawer,
  FloatButton,
  List,
  message,
  Radio,
  Select,
  Space,
  Spin,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListRecipients = ({
  recipients,
  handleRemoveRecipients,
  handleChangeRole,
  handleAddSign,
}) => {
  const removeRecipient = (item) => {
    handleRemoveRecipients(item?.id);
  };

  const changeRoleRecipient = (item) => {
    handleChangeRole(item?.id);
  };

  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={recipients}
      renderItem={(item) => (
        <>
          <List.Item
            actions={[
              <Button
                type="danger"
                onClick={() => removeRecipient(item)}
                icon={<DeleteOutlined />}
                size="small"
              />,
              <Radio.Group
                size="small"
                defaultValue={item?.role}
                onChange={() => changeRoleRecipient(item)}
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
                        userId: item.pegawai_id,
                      })
                    }
                    size="small"
                    type="primary"
                  >
                    Sign
                  </Button>
                )}
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item?.userInfo?.fileDiri?.foto} />}
              title={`${item?.userInfo?.nama} (${item?.role?.toUpperCase()})`}
              description={item?.userInfo?.nip}
            />
          </List.Item>
        </>
      )}
    />
  );
};

const AddRecipientsButton = () => {
  const data = useSelector((state) => state.requestFromOthers);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(undefined);
  const debouncFilter = useDebounce(searching, 1500);
  const [user, setUser] = useState(undefined);

  const [showDrawer, setShowDrawer] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  // untuk menghandle membuat recipients
  const { mutate: addRecipientMutation, isLoading } = useMutation(
    (data) => requestFromOthersAddRecipients(data),
    {
      onSettled: () => {},
      onError: (error) => message.error(error?.response?.data?.message),
      onSuccess: () => {
        queryClient.invalidateQueries([
          "document-detail",
          data?.documentData?.id,
        ]);
        router.push(`/user/document/${data?.documentData?.id}/view`);
      },
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
    () => findRecipients(debouncFilter),
    { enabled: !!debouncFilter, refetchOnWindowFocus: false }
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
    const { id: documentId, filename } = documentData;

    const users = dataUser.map((user) => ({
      id: user?.id,
      userId: user?.pegawai_id,
      nama: user?.userInfo?.nama,
      role: user?.role,
      recipient_json: user?.userInfo,
      stamp: user?.image,
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
        frame,
        employee_id: userId,
        userId,
      };
    });

    const currentDataPost = users.map((user, index) => {
      const properties = signs.filter((sign) => sign.userId === user.userId);

      // fucking serialize this data
      const sign_coordinate = properties?.map((prop) => ({
        id: prop?.id,
        xPos: prop?.xPos,
        yPos: prop?.yPos,
        width: prop?.width,
        height: prop?.height,
        page: prop?.page,
        stamp: user?.stamp,
        frame: prop?.frame,
      }));

      const total_sign_pages = properties?.length;
      const sign_pages = sign_coordinate?.map((s) => s?.page);

      // kalau user itu merupakan reviewer dinullkan
      return {
        sequence: index + 1,
        role: user?.role?.toUpperCase(),
        document_id: documentId,
        signatory_status: "PENDING",
        status: "ONGOING",
        // karena penambahan recipient hanya untuk pns jadi perlu ditambahkan master didepannya
        recipient_id: `master|${user?.userId}`,
        sign_pages:
          user?.role?.toUpperCase() === "REVIEWER" ? undefined : sign_pages,
        sign_coordinate:
          user?.role?.toUpperCase() == "REVIEWER" ? undefined : sign_coordinate,
        sign_properties:
          user?.role?.toUpperCase() == "REVIEWER" ? undefined : sign_coordinate,
        total_sign_pages:
          user?.role?.toUpperCase() === "REVIEWER"
            ? undefined
            : total_sign_pages,
        filename,
        recipient_json: user?.recipient_json,
      };
    });

    // cek dulu
    const signerWithZeroProperty = currentDataPost.filter(
      (user) => user?.role === "SIGNER" && user?.sign_coordinate?.length === 0
    );

    const recipientZero = currentDataPost?.length === 0;

    if (signerWithZeroProperty?.length > 0 || dataUser?.length === 0) {
      const name = signerWithZeroProperty
        ?.map((x) => x?.recipient_json?.nama)
        .join(", ");

      message.error(`${name} is SIGNER but none of them have sign properties.`);
    }

    if (recipientZero) {
      message.error("There is no recipient! Please add one");
    } else {
      // hilangkan yang ga berguna
      const dataPost = currentDataPost.map((d) => {
        const { sign_coordinate, sign_pages, total_sign_pages, ...rest } = d;
        return rest;
      });

      const data = { documentId, data: dataPost };
      // console.log(data)
      addRecipientMutation(data);
      // await recipientsMutation.mutateAsync(data);
      // router.push(`/user/document/${documentId}/view`);
      // send this to backend server
    }
  };

  const handleSearch = (e) => {
    if (!e) {
      return;
    } else {
      setSearching(e);
    }
  };

  return (
    <div>
      <FloatButton
        icon={<PlusCircleFilled />}
        tooltip="Add Recipients"
        onClick={() => setShowDrawer(true)}
        shape="square"
        type="primary"
      >
        Recipients
      </FloatButton>
      <Drawer
        width={800}
        title="Add Recipients"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        extra={
          <Space>
            <Button type="primary" onClick={handleSubmit} loading={isLoading}>
              Submit
            </Button>
          </Space>
        }
      >
        <Select
          style={{ width: "80%" }}
          placeholder="Please type employee number"
          defaultActiveFirstOption={false}
          showSearch
          notFoundContent={loadingEmployee ? <Spin size="small" /> : null}
          loading={loadingEmployee}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
        >
          {!isEmpty(employeeData) && (
            <Select.Option key={employeeData?.pegawai_id}>
              <Space>
                {employeeData.userInfo?.nama} - {employeeData.userInfo?.nip}
              </Space>
            </Select.Option>
          )}
        </Select>
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
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

export default AddRecipientsButton;
