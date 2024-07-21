import CountUp from "react-countup";

import Footer from "../../admin/Footer";
import HeaderAdmin from "../../admin/Header";
import SiderAdmin from "../../admin/Sider";
import { Col, Row, Statistic } from "antd";
import { HomeTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
// Chart
import Chart from "./Chart";
import BarChart from "./BarChart";
import axios from "axios";
import { useEffect } from "react";

const { Content } = Layout;

export default function StatisticManager() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const [size, setSize] = useState("large"); // default is 'middle'
	const formatter = (value) => <CountUp end={value} separator="," />;
	const [year, setYear] = useState(2023);
	const [statisticData, setStatisticData] = useState([]);
	const currentYear = new Date().getFullYear(); 

	const GetStatisticData = async () => {
		// event.preventDefault();
		await axios
			.get(process.env.REACT_APP_SERVER_HOST + "statistic/" + year)
			.then((result) => {
				setStatisticData(result.data);
			});
	};

	const HandleExportExcelClick = async () => {
		// await axios.get("https://localhost:7202/exportExcel/" + year);
		fetch(process.env.REACT_APP_SERVER_HOST + "exportExcel/" + year)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = `RevenueStatistic_${year}.xlsx`;
				link.click();
				URL.revokeObjectURL(url);
			})
			.catch((error) => {
				console.error("Export failed:", error);
			});
	};
	// console.log(year,"main");
	// fetching data
	useEffect(() => {
		GetStatisticData();
	}, [year]);

	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<SiderAdmin />
			<Layout className="site-layout">
				<HeaderAdmin />
				<Content
					style={{
						margin: "0 16px",
					}}
				>
					<Breadcrumb
						style={{
							margin: "16px 0",
						}}
					>
						<Breadcrumb.Item>
							<HomeTwoTone className="mr-1" />
							Home
						</Breadcrumb.Item>
						<Breadcrumb.Item>Revenue Statistic</Breadcrumb.Item>
						{/* <Breadcrumb.Item>Manager</Breadcrumb.Item> */}
					</Breadcrumb>
					<div
						style={{
							padding: 24,
						}}
					>
						<div>
							<h1
								style={{
									textAlign: "center",
									fontSize: "30px",
									marginBottom: "20px",
								}}
							>
								Revenue Analysis
							</h1>
						</div>
					</div>

					{/* design the chart  */}
					<div style={{ marginBottom: "30px" }}>
						<Space wrap>
							<Button
								type="primary"
								style={{
									backgroundColor: year == currentYear - 3 ? "red" : "#1677FF",
								}}
								onClick={() => setYear(currentYear - 3)}
							>
								{currentYear -3}
							</Button>
							<Button
								type="primary"
								style={{
									backgroundColor: year == currentYear - 2 ? "red" : "#1677FF",
								}}
								onClick={() => setYear(currentYear - 2)}
							>
								{currentYear -2}
							</Button>
							<Button
								type="primary"
								style={{
									backgroundColor: year == currentYear - 1 ? "red" : "#1677FF",
								}}
								onClick={() => setYear(currentYear - 1)}
							>
								{currentYear -1}
							</Button>
							<Button
								type="primary"
								style={{
									backgroundColor: year == currentYear ? "red" : "#1677FF",
								}}
								onClick={() => setYear(currentYear)}
							>
								{currentYear}
							</Button>
						</Space>
					</div>

					<Row style={{ marginBottom: "3rem" }}>
						<Col span={8}>
							<Statistic
								title="Total Revenue (USD)"
								value={statisticData.totalRevenue}
								precision={2}
								formatter={formatter}
							/>
						</Col>
						<Col span={8}>
							<Statistic
								title="Active Users"
								value={statisticData.activeUser}
								formatter={formatter}
							/>
						</Col>
						<Col span={8}>
							<Statistic
								title="Total Booking"
								value={statisticData.totalBooking}
								precision={2}
								formatter={formatter}
							/>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<div style={{ marginRight: "15px" }}>
								<div
									style={{
										textAlign: "center",
										fontSize: "20px",
										fontWeight: "30px",
										marginBottom: "20px",
									}}
								>
									<p>Monthly Total Revenue</p>
								</div>
								{/* Column chart */}
								<Chart year={year} />
							</div>
						</Col>
						<Col span={12}>
							<div style={{ marginLeft: "15px" }}>
								<div
									style={{
										textAlign: "center",
										fontSize: "20px",
										fontWeight: "30px",
										marginBottom: "20px",
									}}
								>
									<p>RoomType Total Revenue</p>
								</div>
								<BarChart year={year} />
							</div>
						</Col>
					</Row>
					<Row style={{ marginTop: "50px" }}>
						<Col span={6}></Col>
						<Col span={6}></Col>
						<Col span={6}></Col>
						<Col span={6} style={{ boder: "solid 1px" }}>
							<Button
								type="primary"
								style={{ marginLeft: "290px", backgroundColor: "red" }}
								icon={<DownloadOutlined />}
								size={size}
								onClick={HandleExportExcelClick}
							>
								Export
							</Button>
						</Col>
					</Row>
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
}
