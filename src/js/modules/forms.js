import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();

    };

    const clearInput = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    const clearState = () => {
        for (let key in state) {
            switch(key) {
                case 'height':
                    state.height = 0;
                    break;
                case 'width':
                    state.width = 0;
                    break;
                case 'type':
                    state.type = "tree";
                    break;
                case 'form':
                    state.form = 0;
                    break;
                case 'profile':
                    delete state.profile;
            }
            // delete state[key];
        }
    };

    form.forEach(item => {
        item.addEventListener('submit', (e => {
            e.preventDefault();
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInput();
                    clearState();
                    if (item.getAttribute('data-calc') === "end") {
                        setTimeout(() => {
                          item.closest('.popup_calc_end').style.display = "none";
                          document.body.style.overflow = "scroll";
                        }, 2000);
                    }
                    setTimeout(() => {
                        statusMessage.remove();
                    },5000);
                });
        }));
    });
};

export default forms;