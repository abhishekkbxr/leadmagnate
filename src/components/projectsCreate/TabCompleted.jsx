import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const TabCompleted = () => {
    return (
        <section className="step-body mt-4 text-center">
            <Image src="/images/general/completed-steps.png" width={300} height={300} alt="Project creation completed" className="img-fluid mb-4" />
            <h4 className="fw-bold">Project Created!</h4>
            <p className="text-muted mt-2">If you need more info, please check how to create project</p>
            <div className="d-flex justify-content-center gap-1 mt-5">
                <a href="#" className="btn btn-light">Create New Project</a>
                <Link href="/projects/view" className="btn btn-primary">Preview Project</Link>
            </div>
        </section>

    )
}

export default TabCompleted