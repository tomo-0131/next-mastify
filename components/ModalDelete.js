import { collection, deleteDoc, doc } from "firebase/firestore";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { modalDeleteState } from "../atoms/modalAtom";

function ModalDelete({ img, id }) {
	const { data: session } = useSession();

	const [open, setOpen] = useRecoilState(modalDeleteState);

	const [loading, setLoading] = useState(null);

	const deletePost = async (id) => {
		setLoading(true);
		await deleteDoc(doc(db, "posts", id));
		setLoading(false);
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={setOpen}
			>
				<div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="pb-32 lg:pb-32">
							<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-9 pb-24 pr-24 pl-24 overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-full sm:p-2">
								<img className="object-contain cursor-pointer" src={img} />
								<div className="mt-12 text-center sm:mt-5">
									<Dialog.Title
										as="h3"
										className="text-lg leading-6 font-medium text-gray-900"
									>
										投稿を削除してもよいですか？
									</Dialog.Title>
								</div>

								<div className="mt-2 sm:mt-6">
									<button
										onClick={() => deletePost(id)}
										type="button"
										className="inline-flex justify-center w-full rounded-md border border-transparent shadow-md pt-3 px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
									>
										{loading ? "削除中..." : "削除する"}
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ModalDelete;
