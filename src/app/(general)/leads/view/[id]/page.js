import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import LeadView from '@/components/leads/LeadView';
import Link from 'next/link';

const LeadViewPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader>
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
          <Link href="/leads/list" className="btn btn-secondary">
            Back to list
          </Link>
        </div>
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <LeadView leadId={id} />
        </div>
      </div>
    </>
  );
};

export default LeadViewPage;
