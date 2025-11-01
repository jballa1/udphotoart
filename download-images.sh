#!/bin/bash

# Script to download original photography from udphotoart.com CDN
# with proper referer headers

cd /Users/balla/Projects/rigo/udphotoart/public/images/gallery

REFERER="https://udphotoart.com/"
UA="Mozilla/5.0"

echo "Downloading hero and featured images..."

# Hero image
curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/48998bfb-fc93-45e1-ac5e-4b270c8d4a21_rwc_275x0x1639x1282x32.jpg?h=b6e15eec822d3f158f6767d962605e7e" \
  -o "oslo-norway.jpg"

# Featured Collections
curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/6ed16bc6-1310-485a-81e1-18c255ef4838_rwc_0x0x1638x1281x32.jpg?h=c43e6358eda192ca6f768ca499b59fdd" \
  -o "pune-india.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/d03dac1d-617c-4a99-85f3-ffc80d5e6e25_carw_202x158x32.jpg?h=8098b074faf12a8e2db9828c437a99db" \
  -o "white-sands-nm.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/6d86c5ba-1968-4c5f-aa8f-dd835c553f22_carw_202x158x32.jpg?h=2c7872f5da50fbbf49673bbf872f5379" \
  -o "expressions.jpg"

echo "Downloading photography grid images..."

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/0c768260-de08-44cd-8087-2973760bae32_rwc_141x0x1639x1282x32.jpg?h=fe6bf3cea3af10e05c285b90bf8dd3ae" \
  -o "bucharest-romania.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/db824e6c-e741-46f3-b87c-d4421c809070_rwc_141x0x1639x1282x32.jpg?h=17cd66d4525e165ef6f3eac0d2c5c427" \
  -o "dallas-texas.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/f288f241-a581-4ad9-8ad8-72524bd44a38_rwc_141x0x1635x1279x32.jpg?h=77466df28b002c63a59e5706aa874d90" \
  -o "valle-guadalupe-mexico.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/50e6c2cc-5ab3-4d03-95c3-01517550cba9_rwc_141x0x1639x1282x32.jpg?h=646c62656bfd746f2dd68d1482c20ae1" \
  -o "palm-springs-ca.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/86734f53-ff9c-474c-9f6a-7c3bbd43ad50_rwc_141x0x1639x1282x32.jpg?h=26f1952bfdb50bfa8e99bb72db0fd69c" \
  -o "constanta-romania.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/154c8640-1701-4b4b-8a4d-11dc59f25a00_rwc_141x0x1639x1282x32.jpg?h=95f5b7e4583748aac58fcf87b09f5b9a" \
  -o "boleslawiec-poland.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/abdc7110-fdf8-4b85-9ef2-2c7cd4b82a80_carw_202x158x32.jpg?h=fe6bf3cea3af10e05c285b90bf8dd3ae" \
  -o "prague-czech.jpg"

echo "Downloading Instagram feed images..."

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/6e409773-0a62-42ac-8bab-17e774887bc5_carw_202x158x32.jpg?h=36a1a975a2e19c5ff73bf35c8145d64a" \
  -o "bandera-texas.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/387b68f8-8dd1-4548-8c64-ef9a21ef6758_carw_202x158x32.jpg?h=95f5b7e4583748aac58fcf87b09f5b9a" \
  -o "balloon-fiesta-nm.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/45f49742-d468-4c57-942c-d0a18f3a2ad3_carw_202x158x32.jpg?h=17cd66d4525e165ef6f3eac0d2c5c427" \
  -o "big-bend-texas.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/a04f5ee3-e933-4db0-abf4-09fb9ce0b6c3_carw_202x158x32.jpg?h=77466df28b002c63a59e5706aa874d90" \
  -o "big-bear-ca.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/77bbce0b-da49-4fab-955a-ad40b3578690_carw_202x158x32.jpg?h=fe9573f917c75f7737b8b638c7694b8f" \
  -o "bosque-del-apache-nm.jpg"

curl -H "Referer: $REFERER" -H "User-Agent: $UA" \
  "https://cdn.myportfolio.com/7d36e381-f0d3-492b-8b97-f16a5673863b/2aaed9a4-7cf2-4ef8-b93c-472bbb4cab79_carw_202x158x32.jpg?h=5f4ceabc11d720353a0b77735de903ad" \
  -o "cusco-peru.jpg"

echo "Download complete!"
ls -lh | tail -20
