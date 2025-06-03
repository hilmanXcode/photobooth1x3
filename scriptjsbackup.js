const allPhotos = document.getElementById('allPhotos');
const img = new Image();
img.src = './borderimg.png';

document.addEventListener("DOMContentLoaded", () => {
    let nowTakenPhoto = 1;
    let countTimer = 3;
    const canvas = document.getElementById('canvas');
    const storeAll = document.getElementById('storeAllPhoto');
    const photo = document.getElementById('listPhoto').getElementsByTagName('img');
    const captureButton = document.getElementById('captureButton');
    let video = document.getElementById("vid");
    let mediaDevices = navigator.mediaDevices;
    vid.muted = true;

    console.log();
    
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
                photo[nowTakenPhoto - 1].src = imageDataUrl;
                nowTakenPhoto++;
            }

            if(nowTakenPhoto == 7) {
                clearInterval(timer);
                ctx = allPhotos.getContext('2d');
                
                const cols = 2;
                const photoWidth = 250;
                const photoHeight = 200;
                const gap = 10;

                var arrImage = [].slice.call(photo);
                allPhotos.width = cols * (photoWidth + gap) - gap;
                allPhotos.height = Math.ceil(arrImage.length / cols) * (photoHeight + gap) - gap;
                ctx.fillStyle = '#FFFFFF'
                ctx.fillRect(0, 0, allPhotos.width, allPhotos.height);
                arrImage.forEach(function(image, index) {
                    a += 1;
                    const x = (index % cols) * (photoWidth + gap);
                    const y = Math.floor(index / cols) * (photoHeight + gap);
                    ctx.drawImage(image, x, y, photoWidth, photoHeight);
                });
                
                ctx.drawImage(img, 0, 0, allPhotos.width, allPhotos.height);
                storeAll.src = allPhotos.toDataURL('image/jpeg');
                document.getElementById("timer").innerHTML = "All Doneee 🤩";
                
            }

        }, 1000)


    });
    
    
});
