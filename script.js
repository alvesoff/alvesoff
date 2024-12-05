export class FormPost {
    constructor(idForm, idTextarea, ListPost) {
      this.form = document.getElementById(idForm);
      this.textarea = document.getElementById(idTextarea);
      this.listPost = document.getElementById(ListPost);
      this.image = null; // Para armazenar a imagem anexada
      this.previewContainer = null; // Para armazenar o container da pré-visualização
      this.addSubmit();
      this.addFileUploadListener();
    }
  
    formValidate(value) {
      return value.trim().length >= 3 || this.image !== null;
    }
  
    onSubmit(func) {
      this.form.addEventListener("submit", func);
    }
  
    addSubmit() {
      const handleSubmit = (event) => {
        event.preventDefault();
        if (this.formValidate(this.textarea.value)) {
          const newPost = document.createElement("li");
          newPost.classList.add("post");
          const time = this.getTime();
          newPost.innerHTML = `
            <div class="info-user-post">
              <div class="img-user-post"></div>
  
              <div class="name-and-hour">
                <strong>Douglas Pujol</strong>
                <p>${time}</p>
              </div>
            </div>
  
            <p>${this.textarea.value}</p>
  
            ${this.image ? `<img src="${this.image}" alt="Imagem do post" class="post-image">` : ""}
  
            <div class="action-btn-post">
              <button type="button" class="files-post like">
                <i class="fa-regular fa-heart"></i>
                Curtir <span class="like-count">0</span>
              </button>
              <button type="button" class="files-post comment">
                <i class="fa-regular fa-comment"></i>
                Comentar
              </button>
              <button type="button" class="files-post share">
                <i class="fa-solid fa-share"></i>
                Compartilhar
              </button>
              <button type="button" class="files-post delete">
                <i class="fa-solid fa-trash"></i>
                Excluir
              </button>
            </div>
          `;
          this.addPostEvents(newPost);
          this.listPost.appendChild(newPost);
          this.textarea.value = "";
          this.image = null;
          this.clearPreview();
        }
      };
  
      this.onSubmit(handleSubmit);
    }
  
    getTime() {
      const time = new Date();
      const hour = time.getHours();
      const minutes = time.getMinutes();
      return `${hour}h ${minutes}min`;
    }
  
    addFileUploadListener() {
      const fileButton = document.querySelector(".btn-file-form");
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.style.display = "none";
      document.body.appendChild(fileInput);
  
      fileButton.addEventListener("click", () => {
        fileInput.click();
      });
  
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.image = e.target.result; // Salva a imagem em base64
            this.showPreview(); // Mostra a pré-visualização
          };
          reader.readAsDataURL(file);
        }
      });
    }
  
    showPreview() {
      if (!this.previewContainer) {
        this.previewContainer = document.createElement("div");
        this.previewContainer.classList.add("image-preview");
        this.form.insertBefore(this.previewContainer, this.form.querySelector(".icons-and-button"));
      }
  
      this.previewContainer.innerHTML = `
        <img src="${this.image}" alt="Pré-visualização da imagem" class="preview-image">
        <button type="button" class="remove-preview">Remover</button>
      `;
  
      const removeButton = this.previewContainer.querySelector(".remove-preview");
      removeButton.addEventListener("click", () => this.clearPreview());
    }
  
    clearPreview() {
      if (this.previewContainer) {
        this.previewContainer.remove();
        this.previewContainer = null;
        this.image = null;
      }
    }
  
    addPostEvents(post) {
      const likeButton = post.querySelector(".like");
      const commentButton = post.querySelector(".comment");
      const shareButton = post.querySelector(".share");
      const deleteButton = post.querySelector(".delete");
  
      const likeCountSpan = likeButton.querySelector(".like-count");
      let likeCount = 0;
  
      likeButton.addEventListener("click", () => {
        likeCount++;
        likeCountSpan.textContent = likeCount;
      });
  
      commentButton.addEventListener("click", () => {
        console.log("Comentário clicado. Função em desenvolvimento.");
      });
  
      shareButton.addEventListener("click", () => {
        console.log("Post compartilhado!");
      });
  
      deleteButton.addEventListener("click", () => {
        post.remove();
      });
    }
  }
  
  const postForm = new FormPost("formPost", "textarea", "posts");
  