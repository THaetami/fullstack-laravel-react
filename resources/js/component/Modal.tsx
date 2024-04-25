import React from 'react';
import { useStateContext } from '../contexts/ContextProvider'
import axiosInstance from '../utils/api-default'
import CropImage from './CropImage';

import '../../sass/component/modal.scss';

const Modal = () => {
  const { openModal, setOpenModal, setToken, setUser } = useStateContext()

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    axiosInstance.delete('/auth')
      .then(() => {
        setUser({
          id: 0,
          image: "",
          name: "",
          email: "",
          created_at: "",
          updated_at: "",
        })
        setToken(null)
        setOpenModal({ toggle: false, setting: ""})
      })
  };

  return (
    <> {
        openModal.toggle && (
          <div id="myModal" className="modal-custom animated fadeInDown">
              <div className={`modal-content ${openModal.setting !== "kecil" ? 'mt-besar' : 'mt-kecil'}`}>
                  <div className={`modal-card ${openModal.setting !== "kecil" ? 'besar-modal' : 'kecil-modal'}`}>
                    <div className="modal-card-kecil__body">
                        <div className="close-wrap flex justify-end">
                            <div onClick={() => setOpenModal({ toggle: false, setting: ""})} className="close">&times;</div>
                        </div>
                        { openModal.setting === "besar" &&
                          <div className="besar-modal__wrap">
                            <div className="besar-modal__title"></div>
                            <CropImage />
                            <div className="besar-modal__title"></div>
                          </div>
                        }

                        { openModal.setting === "kecil" &&
                          <>
                            <div>Logout ??</div>
                            <div className="wrap-button flex justify-end">
                                <button onClick={onLogout} className="pointer button-custom">Yes</button>
                            </div>
                          </>
                        }
                    </div>
                </div>
              </div>
          </div>
        )
      }
    </>
  )
}

export default Modal;
