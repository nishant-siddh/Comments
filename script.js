const form = document.querySelector('.comment_form');
const comment_inputValue = document.querySelector('#comment_inputValue');
const usernameInPost = document.querySelector('#usernameInPost');
const comment_post_btn = document.querySelector('#comment_post_btn');
const comment_btn = document.querySelector('.comment_btn');
const list = document.querySelector('#comment_section');

let arr = [];


// ----------- Like and share btn toggle ----------------
function toggle(e, toggle_btn_class) {       // can also be done through loops by adding new classes only to like and bookmark btn using that class
    let toggle_btn_class_edit = toggle_btn_class;

    if (e.target.getAttribute('aria-checked') === 'false') {
        e.target.setAttribute('aria-checked', 'true');
        toggle_btn_class_edit = toggle_btn_class.slice(0, toggle_btn_class.length - 2);
        e.target.className = toggle_btn_class_edit;

        if (toggle_btn_class_edit === 'fa fa-heart') {
            e.target.style = "color: rgb(236, 41, 41)";
        }
    }
    else if (e.target.getAttribute('aria-checked') === 'true') {
        e.target.setAttribute('aria-checked', 'false');
        toggle_btn_class_edit = toggle_btn_class_edit.concat('-o');
        e.target.className = toggle_btn_class_edit;
        e.target.style = "color: rgb(64, 61, 61)";
    }
}


// -------- add comments after clicking on comment_btn icon ---------
comment_btn.addEventListener('click', () => {
    form.parentNode.hidden = false;
    comment_inputValue.focus();
});


// ------ comment_Post_btn enable/disable -------
function enable_post_btn() {
    if (comment_inputValue.value === '') {
        comment_post_btn.style = 'color: rgba(205, 54, 54, 0.698)';
        comment_post_btn.disabled = true;
    }
    else {
        comment_post_btn.style.cssText = 'color: rgb(7, 168, 227); cursor: pointer';
        comment_post_btn.disabled = false;
    }
};

comment_inputValue.addEventListener('input', enable_post_btn);


// creating comments
function renderUi() {
    list.innerHTML = '';
    arr.map((element) => {
        const list_elements = document.createElement('li');
        list_elements.className = 'list_elements';

        // creating username in posts
        const comment_username = document.createElement('h5');
        comment_username.innerText = element.usernameInComment;
        list_elements.appendChild(comment_username);

        // creating edit_input_and_save_container
        const edit_input_and_save_container = document.createElement('div');
        edit_input_and_save_container.className = 'edit_input_and_save_container';

        // adding texts in comment
        const para = document.createElement('input');
        para.setAttribute('readonly', 'readonly');
        para.style.cssText = 'padding-right: 10px; margin-right: 10px; width: 100%';
        para.value = element.user_comment_value;

        // creating span
        const save_btn = document.createElement('span');
        save_btn.className = 'save_btn';
        save_btn.innerText = 'Save';

        edit_input_and_save_container.append(para, save_btn);
        list_elements.appendChild(edit_input_and_save_container);

        // creating comments buttons container
        const comment_section_buttons = document.createElement('div');
        comment_section_buttons.classList.add('comment_section_buttons');
        list_elements.appendChild(comment_section_buttons);


        let i = 0;
        let icon;
        const icons_arr = [];
        element.parentClassesOfIconsInComments.forEach(item => {
            for (let j = i; j <= element.icons_class_arr.length, j <= i; j++) {

                const buttonsInComments = document.createElement('button');
                buttonsInComments.classList.add('btn', item);

                icon = document.createElement('i');
                icon.setAttribute('class', element.icons_class_arr[i]);
                icon.setAttribute('aria-checked', 'false');
                buttonsInComments.appendChild(icon);
                comment_section_buttons.appendChild(buttonsInComments);

                continue;

            }

            icons_arr.push(icon);


            // like comment
            if (i === 0) {
                icons_arr[0].addEventListener('click', (e) => {
                    const comment_like_btn_class = icons_arr[0].getAttribute('class');
                    toggle(e, comment_like_btn_class);
                });
            }



            // update comment
            if (i === 2) {
                icons_arr[2].addEventListener('click', () => {
                    para.removeAttribute('readonly');
                    para.focus();
                    save_btn.style.cssText = 'display: block; cursor: pointer';
                });

                save_btn.addEventListener('click', () => {
                    para.setAttribute('readonly', 'readonly');
                    save_btn.style = 'display: none';
                    element.user_comment_value = para.value;
                })
            }


            // delete comment
            if (i == 3) {
                icons_arr[3].addEventListener('click', (e) => {
                    list_elements.remove();
                    arr = arr.filter(el => el.id !== element.id);
                });
            }

            i++;

        });


        list.append(list_elements);

    });
}


function deleteComment() {
    console.log("Delete");
}


// ---------- creating coment on post section ------------
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const obj = {
        usernameInComment: usernameInPost.innerText,
        user_comment_value: comment_inputValue.value,
        id: new Date(),
        parentClassesOfIconsInComments: [
            'like_btn',
            'reply_btn',
            'update_btn',
            'delete_btn'
        ],

        icons_class_arr: [
            'fa fa-heart-o',
            'fa fa-reply',
            'fa fa-pencil-square-o',
            'fa fa-trash'
        ]
    }
    arr.push(obj);

    renderUi();
    comment_inputValue.value = '';
    enable_post_btn();

})