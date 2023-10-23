// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = ({ handleClose, children }: {handleClose: ()=> void, children:any}) => {
  return (
    <div className="text-purple-400 sm:items-center sm:justify-center sm:h-screen sm:top-0 sm:left-0 sm:right-0 sm:flex sm:absolute">
      <div className="p-6 m-auto bg-white rounded-md sm:max-w-lg">
        {children}
        <button onClick={handleClose} className=''>
          Close
        </button>
      </div>
    </div>
    )
};

export default Modal;
