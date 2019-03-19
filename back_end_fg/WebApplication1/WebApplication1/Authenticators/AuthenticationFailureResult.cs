using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApplication1.Authenticators
{
    internal class AuthenticationFailureResult : IHttpActionResult
    {
        private string errorMessage;
        private HttpRequestMessage requestMessage;

        public AuthenticationFailureResult(string ErrorMsg, HttpRequestMessage RequestMsg)
        {
            this.errorMessage = ErrorMsg;
            this.requestMessage = RequestMsg;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        private HttpResponseMessage Execute()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            response.RequestMessage = requestMessage;
            response.ReasonPhrase = errorMessage;

            return response;
        }
    }
}
