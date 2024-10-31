using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Controllers
{
    [ApiController]
    [Route("Mfa")]
    [Authorize]

    public class MfaController(IMfaService _mfaService) : ControllerBase
    {
        [HttpPost]
        [Route("Setup")]
        public ActionResult<string> Setup()
        {
            try
            {
                var result =  _mfaService.SetupMfa();
                return Ok(result);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while MFA Setup");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpPost]
        [Route("Verify")]
        public ActionResult<string> Verify(string authCode)
        {
            try
            {
                var result = _mfaService.VerifyMfa(authCode);
                return Ok("MFA Verification Successful.");
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while MFA Verification");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }
    }
}
