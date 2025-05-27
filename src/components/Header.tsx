'use client'

import Image from 'next/image'

export default function Header() {
    return (
        <div className="flex justify-center py-6">
            <Image
                src="/images/capcop.png"
                alt="capcop"
                width={300}
                height={100}
                className="object-contain"
            />
        </div>

    )
}