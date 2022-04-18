using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // private readonly DataContext _context;

        // public ActivitiesController(DataContext context)
        // {
        //     this._context = context;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            // return await _context.Activities.ToListAsync();
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            // return await _context.Activities.FindAsync(id);
            var result = await Mediator.Send(new Details.Query { Id = id });
            // var activity = await Mediator.Send(new Details.Query { Id = id });

            // if (activity == null) return NotFound();

            // return activity;

            return HandleResult(result);
        }

        [HttpPost]
        //IActionResult interface gives access to response status e.g. okay, etc.
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Commnad { Id = id }));
        }
    }
}