import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import OrganisationsCreateHeader from '@/components/organisations/OrganisationsCreateHeader'
import OrganisationsCreateContent from '@/components/organisations/OrganisationsCreateContent'

const page = () => {
  return (
    <>
      <PageHeader>
        <OrganisationsCreateHeader />
      </PageHeader>

      <div className='main-content'>
        <div className='row'>
          <OrganisationsCreateContent />
        </div>
      </div>
    </>
  )
}

export default page;