updateIntegrity () {
  hash=$(cat $1 | openssl dgst -sha384 -binary | openssl base64 -A)
  match="src=\".\/$1\" integrity=\".*\""
  replace="src=\".\/$1\" integrity=\"$hash\""
  sed -i '' -e "s/$match/$replace/" index.html
}

updateIntegrity qrcode.min.js
updateIntegrity dist.js
