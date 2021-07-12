updateIntegrity () {
  hash=$(cat $1 | openssl dgst -sha384 -binary | openssl base64 -A)
  match="src=\".\/$1\" integrity=\".*\""
  replace="src=\".\/$1\" integrity=\"sha384-$hash\""
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -e "s#$match#$replace#" index.html
  else
    sed -i -e "s#$match#$replace#" index.html
  fi
}

updateIntegrity qrcode.min.js
updateIntegrity main.js
