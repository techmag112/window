const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                if (passedVerify(triggerSelector)) {
                    windows.forEach(item => {
                        item.style.display = "none";
                    });
                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                }
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = "none";
            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            //document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = "none";
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                //document.body.classList.remove('modal-open');
            }
        });
    }

    function passedVerify(selector) { 
        if (selector === '.popup_calc_button' && (!state.height || !state.width)) {
            return false;
        } 
        if (selector === '.popup_calc_profile_button' && !state.profile) {
            return false;
        } 
        return true;
    }    

    function showModalbyTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalbyTime('.popup', 60000);

};

export default modals;