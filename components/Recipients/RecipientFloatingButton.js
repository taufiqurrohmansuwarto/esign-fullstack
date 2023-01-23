import { roleType, recipientPosition } from '@/lib/client-utils';
import { CheckOutlined,QuestionCircleOutlined  } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';
import {useSession} from 'next-auth/react'
import {useState} from 'react';

const ModalConfirm = ({handleCancel, open, role, description}) => {
    return <Modal open={open} onCancel={handleCancel}>
   <div>
    Hello world
    {JSON.stringify(description)}
   </div>
    </Modal>
}



const RecipientFloatingButton = ({data}) => {
    const {data : session, } = useSession();
    const [open, setOpen] = useState(false)

    const role = roleType(data, session?.user?.id)
    const description = recipientPosition(data, session?.user?.id)
    
    const handleOpen = () => setOpen(true);
    const handleCancel = () => setOpen(false)

    return (
        <>
        <ModalConfirm role={role} open={open} handleCancel={handleCancel} description={description} />
            <FloatButton.Group shape='square' style={{ right: 90 }}>
                <FloatButton tooltip={<div>Recipients</div>} icon={<QuestionCircleOutlined />} />
                { role && (
                    <FloatButton tooltip={<div>Verify</div>} onClick={handleOpen} />
                )}
            </FloatButton.Group>
        </>
    )
}

export default RecipientFloatingButton