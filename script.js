const allPhotos = document.getElementById('allPhotos');
const img = new Image();
const ctx = allPhotos.getContext('2d');
const savephotobtn = document.getElementById('savephoto');
const step = document.getElementById('stepbystep');
let nowTakenPhoto = 1;
let countTimer = 3;
const canvas = document.getElementById('canvas');
// const storeAll = document.getElementById('storeAllPhoto');
const photo = document.getElementById('listPhoto').getElementsByTagName('img');
const captureButton = document.getElementById('captureButton');
let video = document.getElementById("vid");
let mediaDevices = navigator.mediaDevices;
let nameFile = Math.random();
vid.muted = true;
img.src = './borderimage.png';

// const ctx = allPhotos.getContext('2d');
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

document.querySelectorAll('.decoration').forEach(img => {
  img.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.src);
  });
});

allPhotos.addEventListener('dragover', (e) => {
  e.preventDefault(); // diperlukan agar drop bisa diterima
});

allPhotos.addEventListener('drop', (e) => {
  e.preventDefault();

  const imgSrc = e.dataTransfer.getData('text/plain');
  const x = e.offsetX;
  const y = e.offsetY;
  const stickerWidth = 50; // ukuran yang kamu mau di canvas
  const stickerHeight = 50;

  const sticker = new Image();
  sticker.src = imgSrc;

  sticker.onload = () => {
    ctx.drawImage(sticker, x - stickerWidth / 2, y - stickerHeight / 2, stickerWidth, stickerHeight);
    console.log('Hiasan ditambahkan ke canvas.');
  };
});


savephotobtn.addEventListener("click", () => {
    // step.classList.remove('hidden');

    // const base64Data = allPhotos.toDataURL("image/png", 1.0);

    // fetch('http://localhost:3000/saveimage', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ image: base64Data, filename: nameFile }),
    // })
    // .then(res => res.text())
    // .then(console.log)
    // .catch(console.error);

    allPhotos.toBlob((blob) => {
        const formData = new FormData();
        formData.append("image", blob, `${nameFile}.png`);
        formData.append("filename", `${nameFile}.png`);

        fetch('http://localhost:3000/saveimage', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.text())
        .then(console.log)
        .catch(console.error);
    }, 'image/png', 1.0);



    document.getElementById("stepbystep").classList.remove("hidden");
    // new QRCode(document.getElementById("qrcode"), ``);
    new QRCode(document.getElementById("qrcode"), {
	text: `http://192.168.8.119:3000/download/${nameFile}.jpeg`,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    document.getElementById("qrcode").classList.add("p-5")
    document.getElementById("qrcode").classList.add("bg-white")


    nameFile = Math.random();

})




document.addEventListener("DOMContentLoaded", () => {
    
    mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            // Changing the source of video to current stream.
            video.srcObject = stream;
            video.style.transform = 'scaleX(-1)';
            video.addEventListener("loadedmetadata", () => {
                video.play();
            });
        })
        .catch(alert);
    

    
    captureButton.addEventListener('click', () => {
        // canvas.width = 250;
        // canvas.height = 200;
        // canvas.style.transform = 'scaleX(-1)';
        // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        // const imageDataUrl = canvas.toDataURL('image/jpeg');
        // photo[0].style.transform = 'scaleX(-1)';
        // photo[0].src = imageDataUrl;

        var timer = setInterval(async() => {
            document.getElementById("timer").innerHTML = "Get ready in " + countTimer + " seconds";
            countTimer--;

            if(countTimer == -1){
                countTimer = 3;
                canvas.width = 250;
                canvas.height = 200;
                // canvas.style.transform = 'scaleX(-1)';
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                
                let image = await IJS.Image.load(canvas.toDataURL('image/jpeg'));

                let grey = image.flipX();

                const imageDataUrl = grey.toDataURL();
                // photo[nowTakenPhoto - 1].style.transform = 'scaleX(-1)';
                photo[nowTakenPhoto - 1].crossOrigin = "anonymous";
                photo[nowTakenPhoto - 1].src = imageDataUrl;
                nowTakenPhoto++;
            }

            if(nowTakenPhoto == 4) {
                clearInterval(timer);
                var arrImage = [].slice.call(photo);
                console.log(photo.length);
                Promise.all(
                    arrImage.map((imgElement) => {
                        return new Promise((resolve) => {
                            if (imgElement.complete) {
                                resolve();
                            } else {
                                imgElement.onload = resolve;
                                imgElement.onerror = resolve;
                            }
                        });
                    })
                    ).then(() => {
                        const scaleFactor = 2; // di scale gambar nya biar gak burik
                        const padding = 30 * scaleFactor;
                        const cols = 1;
                        const photoWidth = 250 * scaleFactor;
                        const photoHeight = 200 * scaleFactor;
                        const gap = 10 * scaleFactor;

                        allPhotos.width = cols * (photoWidth + gap) - gap + padding * 2;
                        allPhotos.height = Math.ceil(arrImage.length / cols) * (photoHeight + gap) - gap + padding * 2;

                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, allPhotos.width, allPhotos.height);

                        
                        ctx.drawImage(img, 0, 0, allPhotos.width, allPhotos.height);

                        arrImage.forEach(function(image, index) {
                            const x = padding + (index % cols) * (photoWidth + gap);
                            const y = padding + Math.floor(index / cols) * (photoHeight + gap);
                            ctx.drawImage(image, x, y, photoWidth, photoHeight); 
                        });


                        // ctx.drawImage(img, 0, 0, allPhotos.width, allPhotos.height);
                        // storeAll.src = allPhotos.toDataURL('image/jpeg');
                        document.getElementById("adjust").classList.replace("hidden", "flex");
                        document.getElementById("timer").innerHTML = "All Doneee 🤩. Scroll down to adjust your photo!";
                    });

                
            }

        }, 1000)


    });
    
    
});


// new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");