# SafeSight
Mobile Web Based app created to help visually impaired people to be able detect object and recognize text from far ahead or area that can't be detected using white cane (upper body). Utilizing Microsoft Azure feature such as Computer Vision, Translator, and Speech Service. Everything will conveyed verbally using text to speech.
# Interface Mockup
![img](https://drive.google.com/uc?export=view&id=1QRWupxoHAJ4dk0M69jcKVq77iRjd5K6n)  
# Features
1. Object detection & read text  
Capture an image and detect common object on the frame (person, vehicle, obstacle, etc.) then conveyed it verbally using text-to-speech
2. Automatic object detection & read text with interval of 15 seconds (can be adjust)  
Automatically capture an image every 15 seconds to detect object and read text, the use case is when visually impaired people are walking on the street and want to know the object or sign ahead
3. Switch Camera  
Switching camera from front to back (mobile or computer with webcam)
# How it work?
![img](https://drive.google.com/uc?export=view&id=1Z9hIWefRVt93Bh_nzdMvBmTVDjBU1JLJ)  
1. Mobile phone capture the image then send it to Microsoft Azure
2. Image then received by virtual machine, send it to Computer Vision API to detect object and text which later returning list of object and word
3. The list then translated to preferable language (in this case is Indonesian) using Translator API and arrange the information sentences (en: "there are people in front" id:"di depan ada orang")
4. The complete sentence later converted to voice by using Speech Service API and will outputed a voice file formatted in .wav
5. The voice file then send back to frontend to be played to the user
# Limitation
The main problem of this system is LATENCY, as it require many API call to outside resource that resulted in high latency.
