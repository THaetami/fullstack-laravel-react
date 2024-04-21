import { useStateContext } from '../contexts/ContextProvider'
import '../styles/components/modal.scss'
import baseUrl from '../utils/api-default'

export default function Modal() {
  const { openModal, setOpenModal, setToken, setUser } = useStateContext()

  const submitButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    baseUrl.delete('/auth')
      .then(() => {
        setUser({
          id: 0,
          name: "",
          email: "",
          created_at: "",
          updated_at: "",
        })
        setToken(null)
        setOpenModal(false)
      })
  };

  return (
    <> {
        openModal && (
          <div id="myModal" className="modal-custom animated fadeInDown">
              <div className={`modal-content ${!openModal ? 'mt-detail' : 'mt-delete'}`}>
                  <div className={`modal-card ${!openModal ? 'detail-modal' : 'delete-modal'}`}>
                    <div className="modal-card-delete__body">
                        <div className="close-wrap flex justify-end">
                            <div onClick={() => setOpenModal(false)} className="close">&times;</div>
                        </div>
                        {!openModal ? (
                            <>
                                <div className="detail-modal__wrap">
                                    <div className="detail-modal__title"></div>

                                </div>
                                <div className="wrap-button">
                                    <button onClick={submitButton} className="pointer button-custom">close</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>Logout ??</div>
                                <div className="wrap-button flex justify-end">
                                    <button onClick={onLogout} className="pointer button-custom">Yes</button>
                                </div>
                            </>

                            )
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
