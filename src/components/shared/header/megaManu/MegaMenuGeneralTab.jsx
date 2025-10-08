import React from 'react'
import Image from 'next/image'

const MegaMenuGeneralTab = () => {
    return (
        <div className="tab-pane fade show active nxl-mega-menu-sm" id="v-pills-general" role="tabpanel">
            <div className="mb-4 rounded-3 border">
                <Image src="/images/banner/mockup.png" width={300} height={200} alt="Duralux Admin Dashboard UiKit" className="img-fluid rounded-3" />
            </div>
            <h6 className="fw-bolder">Duralux - Admin Dashboard UiKit</h6>
            <p className="fs-12 fw-normal text-muted text-truncate-3-line">Get started Duralux with Duralux up and running. Duralux bootstrap template docs helps you to get started with simple html codes.</p>
            <a href="#" className="fs-13 fw-bold text-primary">Get Started &rarr;</a>
        </div>
    )
}

export default MegaMenuGeneralTab