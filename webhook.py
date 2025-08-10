from flask import Flask, request, abort
import subprocess, hmac, hashlib, os

app = Flask(__name__)

GITHUB_SECRET = os.environ["GITHUB_SECRET"]  # must match GitHub's secret

def verify_signature(payload, signature):
    mac = hmac.new(GITHUB_SECRET, msg=payload, digestmod=hashlib.sha256)
    return hmac.compare_digest("sha256=" + mac.hexdigest(), signature)

@app.route("/webhook", methods=["POST"])
def webhook():
    signature = request.headers.get("X-Hub-Signature-256")
    if not signature or not verify_signature(request.data, signature):
        abort(403)
    subprocess.Popen(["/home/user/git-update.sh"])
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ['GITHUB_PORT'])
