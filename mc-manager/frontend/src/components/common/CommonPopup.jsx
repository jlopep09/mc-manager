
import React from 'react'

const CommonPopup = ({ popupUniqueName, btnLabel, popupTitle, popupDescription, onConfirm}) => {
  const openModal = () => {
    document.getElementById(popupUniqueName)?.showModal()
  }

  return (
    <>
      <button className="btn" onClick={openModal}>
        {btnLabel}
      </button>

      <dialog
        id={popupUniqueName}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{popupTitle}</h3>

          <p className="py-4">
            {popupDescription}
          </p>

          <div className="modal-action">
            <form method="dialog">
                <button className="btn me-2" onClick={onConfirm}>Confirmar</button>
                <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default CommonPopup
