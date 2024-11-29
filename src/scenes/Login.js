import Phaser from "phaser";

export class Login extends Phaser.Scene {
  constructor() {
    super("Login");
  }
  
  create() {
    this.add.image(960, 540, 'fondosolo'); // Fondo

    // Definir las posiciones de los textos
    const centerX = this.cameras.main.width / 2;
    const startY = 100; // El primer texto comenzará en esta posición Y
    const lineHeight = 100; // Espacio entre los textos

    // Agregar el texto "Login" centrado
    this.add
      .text(centerX, startY, "Login", {
        fontFamily: 'SuperBrain', fontSize: 50, color: '#343434',
        stroke: '#df8a34', strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5);

    // Agregar el texto "Ingresar con Email y contraseña"
    this.add
      .text(centerX, startY + lineHeight, "Ingresar con Email y contraseña", {
        fontFamily: 'SuperBrain', fontSize: 26, color: '#343434',
        stroke: '#df8a34', strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        const email = prompt("Email");
        const password = prompt("Password");
        this.firebase
          .signInWithEmail(email, password)
          .then(() => {
            this.scene.start("Preloader");
          })
          .catch(() => {
            const crearUsuario = window.confirm(
              "Email no encontrado. \n ¿Desea crear un usuario?"
            );
            if (crearUsuario) {
              this.firebase
                .createUserWithEmail(email, password)
                .then(() => {
                  this.scene.start("Preloader");
                })
                .catch((createUserError) => {
                  console.log("🚀 ~ file: Login.js:51 ~ .catch ~ error", createUserError);
                });
            }
          });
      });

    // Agregar el texto "Ingresas de forma Anonima"
    this.add
      .text(centerX, startY + 2 * lineHeight, "Ingresas de forma Anonima", {
        fontFamily: 'SuperBrain', fontSize: 26, color: '#343434',
        stroke: '#df8a34', strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInAnonymously()
          .then(() => {
            this.scene.start("Preloader");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    // Agregar el texto "Ingresar con Google"
    this.add
      .text(centerX, startY + 3 * lineHeight, "Ingresar con Google", {
        fontFamily: 'SuperBrain', fontSize: 26, color: '#343434',
        stroke: '#df8a34', strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("Preloader");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
  }
}