import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { FiMoreHorizontal } from 'react-icons/fi'


const ImageGroup = ({ data = [], avatarSize = "avatar-sm", avatarMore, avatarStyle }) => {
    return (
        <>
            {data.map(({ user_name, user_img, id }, index) => (
                <Link key={index} href="#" className={`avatar-image ${avatarSize}`} data-toggle="tooltip" data-bs-trigger="hover" data-title={user_name}>
                    <Image src={user_img} width={30} height={30} className="img-fluid" alt={user_name} />
                </Link>
            ))}
            <Link href="#" className={`avatar-text ${avatarSize} ${avatarStyle}`} data-toggle="tooltip" data-bs-trigger="hover" data-title="Explore More">
                {avatarMore ||<FiMoreHorizontal />}
            </Link>
        </>
    )
}

export default ImageGroup