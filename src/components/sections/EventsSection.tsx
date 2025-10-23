import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFieldArrayReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { WeddingSiteFormData } from '../../lib/validations';

interface EventsSectionProps {
  register: UseFormRegister<WeddingSiteFormData>;
  errors: FieldErrors<WeddingSiteFormData>;
  control: Control<WeddingSiteFormData>;
  eventsArray: UseFieldArrayReturn<
    WeddingSiteFormData,
    'events',
    'id'
  >;
}

export function EventsSection({
  register,
  errors,
  control,
  eventsArray,
}: EventsSectionProps) {
  const { fields, append, remove } = eventsArray;

  const addEvent = () => {
    append({
      title: '',
      date: new Date(),
      time: '',
      location: '',
      address: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
        <CardDescription>
          Add ceremony, reception, and other events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Event {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Event Title *
                </label>
                <Input
                  {...register(`events.${index}.title`)}
                  placeholder="e.g., Ceremony"
                />
                {errors.events?.[index]?.title && (
                  <p className="text-sm text-red-500">
                    {errors.events[index]?.title?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Location Name *
                </label>
                <Input
                  {...register(`events.${index}.location`)}
                  placeholder="e.g., St. Mary's Church"
                />
                {errors.events?.[index]?.location && (
                  <p className="text-sm text-red-500">
                    {errors.events[index]?.location?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name={`events.${index}.date`}
                control={control}
                render={({ field: dateField }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Date *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateField.value
                            ? format(dateField.value, 'PPP')
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateField.value}
                          onSelect={(date) =>
                            date && dateField.onChange(date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.events?.[index]?.date && (
                      <p className="text-sm text-red-500">
                        {errors.events[index]?.date?.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Time *</label>
                <Input
                  type="time"
                  {...register(`events.${index}.time`)}
                />
                {errors.events?.[index]?.time && (
                  <p className="text-sm text-red-500">
                    {errors.events[index]?.time?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address *</label>
              <Input
                {...register(`events.${index}.address`)}
                placeholder="Full address for Google Maps"
              />
              {errors.events?.[index]?.address && (
                <p className="text-sm text-red-500">
                  {errors.events[index]?.address?.message}
                </p>
              )}
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={addEvent}
          variant="outline"
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </CardContent>
    </Card>
  );
}
