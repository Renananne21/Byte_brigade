import k2connect

token_service = k2connect.Tokens

# request the access token
access_token_request = token_service.request_access_token()

# get access token
access_token = token_service.get_access_token(access_token_request)
print(access_token)