import socket

MAX_PACKET = 32768

resp_h = {
    "http": lambda resp: "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\nContent-Length: " + str(len(resp)) + "\nConnection: close\n",
    "coap": lambda resp: "\x96\x97\x12\xc1\x3c\xff\xbf\x63\x46\x75\x6e\xf5\x63\x41\x6d\x74\x21\xff",
    "mqtt": lambda resp: 0 # http://www.steves-internet-guide.com/mqtt-protocol-messages-overview/
}

def recv_all(sock):
    prev_timeout = sock.gettimeout()
    try:
        sock.settimeout(0.01)

        rdata = []
        while True:
            try:
                rdata.append(sock.recv(MAX_PACKET))
            except socket.timeout:
                return ''.join(rdata)

    finally:
        sock.settimeout(prev_timeout)

def normalize_line_endings(s):
    return ''.join((line + '\n') for line in s.splitlines())

def gotReq(req):
    #handleToExp(req)
    return req

def run():
    server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM, \
                                socket.IPPROTO_TCP)
    server_sock.bind(('0.0.0.0', 21000))
    server_sock.listen(1)

    while True:
        client_sock, client_addr = server_sock.accept()

        request = normalize_line_endings(recv_all(client_sock))
        print("=== REQ ===\n");
        print(request);
        gotReq(request)

        response_body = "{\"success\": true}"

        client_sock.send(resp_h["http"](response_body));
        client_sock.send('\n')
        client_sock.send(response_body);
        client_sock.close()

run()