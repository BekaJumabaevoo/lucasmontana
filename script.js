const contact = document.querySelector(".contact");
const contactOverlay = document.querySelector(".contact_overlay");
const sendMessage = document.querySelector(".send");

contact.addEventListener("click", () => {
  contactOverlay.classList.add("active");
  document.body.style.overflow = "fixed";
});

sendMessage.addEventListener("click", () => {
  contactOverlay.classList.remove("active");
  document.body.style.position = "static";
});

const imgItem = document.querySelectorAll(".img_item");
const modal = document.querySelector(".modal_img");
const closeImg = document.querySelector(".close_btn");
const imgModal = document.querySelector(".img_modal");

imgItem.forEach((itemS) => {
  itemS.addEventListener("click", () => {
    const src = itemS.getAttribute("src");
    imgModal.setAttribute("src", src);
    modal.classList.add("active");
    document.body.style.overflow = "fixed";
  });
});

closeImg.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.position = "static";
});
