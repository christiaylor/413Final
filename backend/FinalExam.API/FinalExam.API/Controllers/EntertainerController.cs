using FinalExam.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private EntertainerDbContext _entertainerContext;
        public EntertainerController(EntertainerDbContext temp) 
        {
            _entertainerContext = temp;
        }

        [HttpGet("AllEntertainers")]
        public IActionResult GetEntertainers(int pageLength = 10, int pageNum = 1)
        {
            var query = _entertainerContext.Entertainers.AsQueryable();

            //if (projectTypes != null && projectTypes.Any())
            //{
            //    query = query.Where(p => projectTypes.Contains(p.ProjectType));
            //}

            var totalNumEntertainers = query.Count();

            //HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
            //{
            //    HttpOnly = true,
            //    Secure = true,
            //    SameSite = SameSiteMode.Strict,
            //    Expires = DateTime.Now.AddMinutes(5),
            //});


            var something = query
            .Skip((pageNum -1) * pageLength)
            .Take(pageLength)
            .ToList();


            var someObject = new
            {
                Entertainers = something,
                TotalNumEntertainers = totalNumEntertainers
            };

            return Ok(someObject);
 
        }
        [HttpGet("bookingInfo")]
        public async Task<ActionResult<IEnumerable<Engagement>>> Engagement()
        {
            var entertainersWithInfo = await _entertainerContext.Entertainers
                .Select(e => new Engagement
                {
                    EntertainerID = e.EntertainerID,
                    EntStageName = e.EntStageName,
                    EngagementCount = _entertainerContext.Engagements.Count(b => b.EntertainerID == e.EntertainerID),
                    StartDate = _entertainerContext.Engagements
                        .Where(b => b.EntertainerID == e.EntertainerID)
                        .Max(b => (DateTime?)b.StartDate) // Assuming 'StartDate' is the relevant date
                })
                .ToListAsync();

            return Ok(entertainersWithInfo);
        }


        //[HttpGet("GetProjectTypes")]
        //public IActionResult GetProjectTypes()
        //{
        //    var projectTypes = _entertainerContext.Entertainers
        //        .Select(p => p.ProjectType)
        //        .Distinct()
        //        .ToList();

        //    return Ok(projectTypes);

        //}


        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody]Entertainer newEntertainer)
        {
            _entertainerContext.Entertainers.Add(newEntertainer);
            _entertainerContext.SaveChanges();
            return Ok(newEntertainer);
        }

        [HttpPut("UpdateEntertainer/{EntertainerID}")]
        public IActionResult UpdateEntertainer(int entertainerID, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _entertainerContext.Entertainers.Find(entertainerID);

            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSSN = updatedEntertainer.EntSSN;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
            existingEntertainer.EntEMailAddress = updatedEntertainer.EntEMailAddress;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;




            _entertainerContext.Entertainers.Update(existingEntertainer);
            _entertainerContext.SaveChanges();
            
            return Ok(existingEntertainer);

        }

        [HttpDelete("DeleteEntertainer/{EntertainerID}")]
        public IActionResult DeleteEntertainer(int EntertainerID)
        {
            var entertainer = _entertainerContext.Entertainers.Find(EntertainerID);
            if (entertainer == null)
            {
                return NotFound(new {message = "Entertainer not found"});
            
            }
            _entertainerContext.Entertainers.Remove(entertainer);
            _entertainerContext.SaveChanges();

            return NoContent();
        }

    }
}
