'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { Fragment } from "react"


const CommonModel = ({ modelTitle, mainContent, showButtons, buttonComponent, show, setShow, showModelTitle }) => {
    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" onClose={setShow} className={'relative z-10'}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-900"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="fixed inset-y-0 right-0 flex min-w-full pl-10">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-in-out duration-900"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <DialogPanel className={"w-screen max-w-md"}>
                                    <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            {
                                                showModelTitle
                                                    ?
                                                    <div className="flex items-start justify-between">
                                                        <DialogTitle>
                                                            {modelTitle}
                                                        </DialogTitle>
                                                    </div>
                                                    : null
                                            }
                                            <div className="mt-20">
                                                {mainContent}
                                            </div>
                                        </div>
                                        {
                                            showButtons ?
                                                <div className="border-t border-gray-300 px-4 py-6 sm:px-6">{buttonComponent}</div>
                                                : null
                                        }
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CommonModel