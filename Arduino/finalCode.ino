/* 수정
3. 안드로이드 완성 앱
4. 릴레이 on/off 반대 수정
5. 온습도계 사서 오차 잡기
6. 가습기 꺼지면 취침모드 대기모드 -> 은은한 색
*/

#include <SoftwareSerial.h>
#include <Adafruit_NeoPixel.h> //LED 스트립
SoftwareSerial BTSerial(2,3); //SoftwareSerial클래스 선언, 블루투스 통신 기본 변수 만듬, 생성자에 핀번호 RX, TX
#include "DHT.h"

/* 온습도 */
#define DHTTYPE DHT11

/*초음파 핀할당*/
int trigPin = 12; //triger 핀 5핀 사용
int echoPin = 13; //echo 핀 6핀 사용
int dhtPin = 7; //dht11 핀 7사용
int relayPin = 8; //relay 핀 8사용

DHT dht(dhtPin,DHTTYPE);

/*LED스트립 핀할당*/
#define PIN            9  //LED 핀
#define NUMPIXELS      19                             // 제어하고 싶은 LED 개수

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
//int delayval = 100; // delay for half a second

/*전원 플래그*/
int onoff =0;         //가습기 가동 여부 꺼짐=0 켜짐=1       
int opened =0;        // 이제막 켜졌을 때(onoff가 1로 초기화 될때).켜짐으로 바뀌고 첫 조명 이벤트 flag
int closedColorWave = 0;    //가습기가 꺼져있는 상태(onoff =0)에서 void loop() 한번 돌아갈 때마다 켜지는 조명에 영향을 주기 위한 변수 0-255 까지 있음
int temp =0;
int temp2=0;
void setup(){
  Serial.begin(9600);
  
  /*블루투스 setting */
  BTSerial.begin(9600); 
  
  /*초음파 setting*/
  pinMode(trigPin, OUTPUT); //Triger(4핀에 연결 된) 출력으로 사용하겠다
  pinMode(echoPin, INPUT); 

  /*온습도 setting*/
  dht.begin();
  
  /*릴레이 setting*/
  pinMode(relayPin,OUTPUT);
  
  /*RGB settting*/
  pixels.begin(); // This initializes the NeoPixel library.  

}

void loop(){
 
  //초음파 발사
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  //측정된 시간 -> cm 거리로 환산
  int duration = pulseIn(echoPin, HIGH); //물체 거리까지 갔다온 시간 얻어와서
  int dist = microsecondsToCentimeters(duration); // 거리(cm)로 변환, dist cm 변수 -> LED 제어
  delay(1000);

  Serial.print("distance: ");
  Serial.print(dist);
  LED(dist);
  
  //온습도, 릴레이
  int h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

 
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.print(" isOnOff: ");  
  Serial.print(onoff);
 
//첫상태
  int btdist = 0;
  btdist = 22-dist;
  if(btdist >= 22) {btdist = 22;}  
  else if(btdist <= 0){ btdist = 0;}

  /*습도로 onoff 조절*/
   /*안드로이드 플래그로 onoff 조절*/
  if(BTSerial.available())
  {
    String readed;
    readed = BTSerial.read();
     
     /*get On flag from Android*/
    if(readed.equals("49"))
    {
      temp=1;
      temp2=0;
      Serial.print("켜짐");
       digitalWrite(relayPin,LOW); //on
       onoff = 1;
       
          int btdist = 0;
          btdist = 22-dist;
          if(btdist >= 22) btdist = 22;  
          else if(btdist <= 0) btdist = 0;
          
          //블루투스 온습도
          String str = "";
          str+=h;
          str+=",";
          str+=t;
          str+=",";
          str+=btdist;
          str+=",";
          str+=onoff;
          Serial.print(onoff);
          str+="\n";
          BTSerial.print(str);
    }
    /*get Off flag from Android*/
    else if(readed.equals("48"))
    {
      temp=0;
      temp2=1;
      Serial.print("꺼짐");
      digitalWrite(relayPin,HIGH); //off
      onoff = 0;
      
      int btdist = 0;
      btdist = 22-dist;
      if(btdist >= 22) btdist = 22;  
      else if(btdist <= 0) btdist = 0;
      //블루투스 온습도
      String str = "";
      str+=h;
      str+=",";
      str+=t;
      str+=",";
      str+=btdist;
      str+=",";
      str+=onoff;
      str+="\n";
      BTSerial.print(str);
    }
  }
  if(h>80 && onoff == 1)
  {
     digitalWrite(relayPin,HIGH); //off 
     onoff = 0;
      int btdist = 0;
      btdist = 22-dist;
      if(btdist >= 22) btdist = 22;  
      else if(btdist <= 0) btdist = 0;
      //블루투스 온습도
      String str = "";
      str+=h;
      str+=",";
      str+=t;
      str+=",";
      str+=btdist;
      str+=",";
      str+=onoff;
      str+="\n";
      BTSerial.print(str);
  }
  if(h<=80&& onoff==0 && temp==1){
    digitalWrite(relayPin,LOW); //on
     onoff = 1;
      int btdist = 0;
      btdist = 22-dist;
      if(btdist >= 22) btdist = 22;  
      else if(btdist <= 0) btdist = 0;
      //블루투스 온습도
      String str = "";
      str+=h;
      str+=",";
      str+=t;
      str+=",";
      str+=btdist;
      str+=",";
      str+=onoff;
      str+="\n";
      BTSerial.print(str);
  }
  else if(h<=80 && onoff==0 && temp2==1){
    digitalWrite(relayPin,HIGH); //off
     onoff = 0;
      int btdist = 0;
      btdist = 22-dist;
      if(btdist >= 22) btdist = 22;  
      else if(btdist <= 0) btdist = 0;
      //블루투스 온습도
      String str = "";
      str+=h;
      str+=",";
      str+=t;
      str+=",";
      str+=btdist;
      str+=",";
      str+=onoff;
      str+="\n";
      BTSerial.print(str);
  }
 
  
  //블루투스 온습도
  String toAndroid = "";
  toAndroid+=h;
  toAndroid+=",";
  toAndroid+=t;
  toAndroid+=",";
  toAndroid+=btdist;
  toAndroid+=",";
  toAndroid+=onoff;
  Serial.print(" isOnOff: ");  
  Serial.print(onoff);
  toAndroid+="\n";
  
  BTSerial.print(toAndroid);

  //delay(2000);
 
}

/*초음파 cm 변환 */
int microsecondsToCentimeters(int microseconds)
{
  return microseconds / 29 / 2;
}

void LED(int dist){ // 1. 물양에 따른 조절 2. 전원에 따른 조절
  
  pixels.clear();
  int LED_dist = 22 - dist; //높이 재서 수정 
  int LED_MODE = 0; //0번 기본모드 1번 빨간색 blink(물 없을때)

  /*물양 예외 처리*/
  if(LED_dist >= 22) LED_dist = 22;
  else if(LED_dist <= 0){
    LED_dist = 0;
    LED_MODE = 1; //lack flag
  }
  
  Serial.print("LED_dist");
  Serial.println(LED_dist);
  
  if(onoff ==1 && opened ==0)
  {
    // 가습기가 켜졌을 때 이벤트
    openedColor();
    opened=1;
  }
  else if(onoff ==1 && LED_MODE == 0 && opened == 1) //가습기가 켜진 상태의 일반적인 상태
  {
    colorDistanceWipe(pixels.Color(80,80,255),30,LED_dist);
    delay(500);
  } 
  else if(onoff ==1 && LED_MODE == 1 && opened == 1) //가습기가 켜진 상태의 물부족 상태
  {
    lackOfWater(LED_dist);
    if(LED_dist != 0)
    {
        pixels.clear();
        LED_MODE = 0;
    }
  }
  else if(onoff == 0)  //가습기가 꺼진 상태의 LED
  {
    opened=0;
    closedRainbow(60);      //꺼졌을때 rainbow() 가 켜져있다.  
  }
}

//가습기가 이제 막 켜졌을때의 상태
void openedColor()
{
  //중앙에서 색깔 뻗어나가는 이벤트
  int colors[7][3] ={{250,0,0},{230,50,0},{220,169,0},
  {0,250,0},{0,0,247},{0,90,250},{36,20,250}};
  pixels.clear();
  
  int k =8;
  for(int i =0; i<7; i++)
  {
    //짝수일 경우 중앙에서 시작
    if(i%2 ==0)
    { 
      pixels.setPixelColor(9,pixels.Color(colors[i][0], colors[i][1], colors[i][2])); 
      pixels.show();
      delay(60);
      for(int j =10; j<=pixels.numPixels(); j++)
      {
        pixels.setPixelColor(j,colors[i][0],colors[i][1],colors[i][2]);
        pixels.setPixelColor(k,colors[i][0],colors[i][1],colors[i][2]);
        k-=1;
        pixels.show();  
        delay(60);
      } 
    }
    else    //홀수일 경우 양끝에서 시작
    {
      for(int j =pixels.numPixels(); j>=10; j--)
      {
        pixels.setPixelColor(j,colors[i][0],colors[i][1],colors[i][2]);
        pixels.setPixelColor(k,colors[i][0],colors[i][1],colors[i][2]);
        k+=1;
        pixels.show();  
        delay(60);
      }
    }
  }
  
  //전체를 0부터 255까지 순서대로 끌어올리고 이벤트 끝내기
  pixels.clear();
  for(int i =0; i<=255; i++)
  {
    for(int j =0; j<=pixels.numPixels(); j++)
    {
      pixels.setPixelColor(j,pixels.Color(i,i,i));
      pixels.show();  
    }
   }
   pixels.clear();
}

/*일반적인 상태*/
void colorDistanceWipe(uint32_t c, uint8_t wait, int dis) {        
  for(uint16_t i=0; i<dis; i++) {    //거리 많큼 LED 개수를 출력함.
    pixels.setPixelColor(i, c);
    pixels.show();
    delay(wait);
  }
  for(uint16_t i=0; i<dis; i++) {   //거리 많큼 LED 개수를 출력함.
    pixels.setPixelColor(i, c);
    pixels.show();
    delay(wait);
  }
}

/* 물 부족 */
void lackOfWater(int LED_dist)       
{
  for(int i =0; i<256; i+=10)
  {
     colorWipe(pixels.Color(i, 30, 30), 1); // Red
     pixels.show();
  }
   pixels.show(); // This sends the updated pixel color to the hardware.
}

/* 꺼졌을 때 천천히 무지개색을 빛추는 이벤트*/
void closedRainbow(uint8_t wait) {
  if(closedColorWave >= 256)
  {
    closedColorWave =0;
  }
  else
  {
    closedColorWave +=1;
  }
  for(int i =0; i<pixels.numPixels(); i++)
  {
    pixels.setPixelColor(i,Wheel((i+closedColorWave) & 255));
  }
  pixels.show();
  delay(40);
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
    return pixels.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if(WheelPos < 170) {
    WheelPos -= 85;
    return pixels.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return pixels.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}

// 컬러순서대로 뽑는 것.
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<pixels.numPixels(); i++) {
    pixels.setPixelColor(i, c);
    pixels.show();
    delay(wait);
  }
  for(uint16_t i=0; i<pixels.numPixels(); i++) {
    pixels.setPixelColor(i, c);
    pixels.show();
    delay(wait);
  }
}
