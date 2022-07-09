using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistent;

namespace Application.Activities
{
    public class Create
    {
        //Here Command object will actually not required to return anything.
        //However, as we are dealing with Result, Mediator.Unit is used to 
        //indicate we are not really returning anything.
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(r => r.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

//SaveChangesAsync will actually return no. of entries afftected to database.
//
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");
                //below line of code will not do anything. However, it will help understand controller that 
                //it has finished request processing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}