"use client";

import Banner from "@/components/banner";
import BarsDataset from "@/components/mui/chart";
import BasicLineChart from "@/components/mui/graph";

export default async function Home() {
  return (
    <>
      <Banner title="Home" />
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6">
            <BarsDataset />
          </div>
          <div className="col-md-6">
            <BasicLineChart />
          </div>
        </div>
      </div>
    </>
  );
}
