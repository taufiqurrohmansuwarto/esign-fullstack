import { Avatar } from "antd";
import Image from "next/image";

const UserAvatar = ({ src, alt, size }) => {
    return (
        <Avatar size={size}>
            <Image src={src} alt={alt} width={size} height={size} />
        </Avatar>
    );
};

export default UserAvatar;