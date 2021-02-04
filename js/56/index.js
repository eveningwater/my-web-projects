const fonts = ['新','年', '快', '乐'];
const createLayOut = (value) => `
        <div class="lantern-box">
            <div class="lantern-light">
                <div class="lantern-line"></div>
                <div class="lantern-circle">
                    <div class="lantern-rect">
                        <div class="lantern-text">${value}</div>
                    </div>
                </div>
                <div class="lantern-tassel-top">
                    <div class="lantern-tassel-middle"></div>
                    <div class="lantern-tassel-bottom"></div>
                </div>
            </div>
        </div>
    `;
let containerHTML = '';
fonts.forEach(item => containerHTML += createLayOut(item));
document.querySelector('.container').innerHTML = containerHTML;