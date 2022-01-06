import Head from "next/head";
import { modalState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ModalDelete from "../components/ModalDelete";

export default function Home() {
	return (
		<div className="bg-gray-100 h-screen overflow-y-scroll scrollbar-hide">
			<Head>
				<title>Mastify</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* Modal */}
			<Modal />
			{/* Header */}
			<Header />
			{/* Feed */}
			<Feed />
		</div>
	);
}
