import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { 
  format, 
  startOfToday, 
  subDays,
  addDays,
  add, 
  eachDayOfInterval, 
  endOfMonth,
  startOfWeek,
  endOfWeek,
  parse, 
  getDay, 
  isEqual, 
  isSameDay, 
  isToday, 
  parseISO 
} from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  lead_id?: string;
  created_at: string;
  updated_at: string;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isViewEventsOpen, setIsViewEventsOpen] = useState(false);
  const [dateEvents, setDateEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start_date: format(startOfToday(), 'yyyy-MM-dd'),
    start_time: '09:00',
    end_date: format(startOfToday(), 'yyyy-MM-dd'),
    end_time: '10:00',
    all_day: false,
    lead_id: ''
  });

  const fetchEvents = async () => {
    const dummyEvents = [
      {
        id: '1',
        title: 'Client Meeting',
        description: 'Discuss new product requirements',
        start_time: format(addDays(startOfToday(), 1), "yyyy-MM-dd'T'10:00:00"),
        end_time: format(addDays(startOfToday(), 1), "yyyy-MM-dd'T'11:30:00"),
        all_day: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Team Review',
        description: 'Monthly performance review',
        start_time: format(startOfToday(), "yyyy-MM-dd'T'14:00:00"),
        end_time: format(startOfToday(), "yyyy-MM-dd'T'15:00:00"),
        all_day: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Product Launch',
        description: 'Launch of new pharmaceutical line',
        start_time: format(addDays(startOfToday(), 3), "yyyy-MM-dd'T'00:00:00"),
        end_time: format(addDays(startOfToday(), 3), "yyyy-MM-dd'T'23:59:59"),
        all_day: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    setEvents(dummyEvents);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const eventsOnDate = events.filter(event => 
      isSameDay(parseISO(event.start_time), date)
    );
    setDateEvents(eventsOnDate);
    if (eventsOnDate.length > 0) {
      setIsViewEventsOpen(true);
    }
  };

  const handlePrevPeriod = () => {
    if (viewMode === 'day') {
      setCurrentDate(prevDate => subDays(prevDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(prevDate => subDays(prevDate, 7));
    } else {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    }
  };

  const handleNextPeriod = () => {
    if (viewMode === 'day') {
      setCurrentDate(prevDate => addDays(prevDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(prevDate => addDays(prevDate, 7));
    } else {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    }
  };

  const handleAddEvent = () => {
    setNewEvent({
      title: '',
      description: '',
      start_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(startOfToday(), 'yyyy-MM-dd'),
      start_time: '09:00',
      end_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(startOfToday(), 'yyyy-MM-dd'),
      end_time: '10:00',
      all_day: false,
      lead_id: ''
    });
    setIsAddEventOpen(true);
  };

  const handleCreateEvent = async () => {
    try {
      const startDateTime = `${newEvent.start_date}T${newEvent.start_time}:00`;
      const endDateTime = `${newEvent.end_date}T${newEvent.end_time}:00`;

      const newDummyEvent = {
        id: String(events.length + 1),
        title: newEvent.title,
        description: newEvent.description,
        start_time: startDateTime,
        end_time: endDateTime,
        all_day: newEvent.all_day,
        lead_id: newEvent.lead_id || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setEvents([...events, newDummyEvent]);
      setIsAddEventOpen(false);
      
      toast({
        title: "Event Created",
        description: "Your event has been successfully created",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "There was an error creating your event",
        variant: "destructive"
      });
    }
  };

  const getDaysToDisplay = () => {
    if (viewMode === 'day') {
      return [currentDate];
    } else if (viewMode === 'week') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    } else {
      return [];
    }
  };

  const daysToDisplay = getDaysToDisplay();

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Schedule meetings, set reminders, and manage your time
          </p>
        </div>
        <Button onClick={handleAddEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Event</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {viewMode === 'day' 
              ? format(currentDate, 'MMMM d, yyyy')
              : viewMode === 'week'
                ? `${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}`
                : format(currentDate, 'MMMM yyyy')
            }
          </h2>
          <Button variant="outline" size="icon" onClick={handleNextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="md:w-1/3">
          <Select 
            value={viewMode} 
            onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)}
          >
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>View: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewMode === 'month' ? (
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              onDayClick={handleDateClick}
              month={currentDate}
              onMonthChange={setCurrentDate}
              className="w-full"
              disabled={date => date < new Date('1900-01-01')}
              modifiers={{
                event: date => events.some(event => isSameDay(parseISO(event.start_time), date))
              }}
              modifiersClassNames={{
                event: 'bg-primary/20 font-bold text-primary'
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {daysToDisplay.map((day, index) => (
            <Card key={index} className={
              isSameDay(day, new Date()) ? 'border-primary' : ''
            }>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">
                    {format(day, 'EEEE, MMMM d')}
                    {isSameDay(day, new Date()) && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedDate(day);
                    handleAddEvent();
                  }}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {events
                    .filter(event => isSameDay(parseISO(event.start_time), day))
                    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
                    .map(event => (
                      <div 
                        key={event.id} 
                        className="p-2 rounded-md border border-l-4 border-l-primary cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setDateEvents([event]);
                          setIsViewEventsOpen(true);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{event.title}</h4>
                          {!event.all_day && (
                            <span className="text-xs text-muted-foreground">
                              {format(parseISO(event.start_time), 'h:mm a')} - {format(parseISO(event.end_time), 'h:mm a')}
                            </span>
                          )}
                        </div>
                        {event.all_day && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-sm">All day</span>
                        )}
                        {event.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    ))}
                  
                  {events.filter(event => isSameDay(parseISO(event.start_time), day)).length === 0 && (
                    <div className="py-6 text-center text-muted-foreground">
                      <p>No events scheduled</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in your calendar. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                value={newEvent.title} 
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Meeting with client" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={newEvent.description} 
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Details about the event" 
                rows={3} 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="all-day" 
                checked={newEvent.all_day}
                onCheckedChange={(checked) => setNewEvent({...newEvent, all_day: checked === true})}
              />
              <label
                htmlFor="all-day"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                All day event
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date" 
                  value={newEvent.start_date} 
                  onChange={(e) => setNewEvent({...newEvent, start_date: e.target.value})}
                />
              </div>
              
              {!newEvent.all_day && (
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input 
                    id="start-time" 
                    type="time" 
                    value={newEvent.start_time} 
                    onChange={(e) => setNewEvent({...newEvent, start_time: e.target.value})}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input 
                  id="end-date" 
                  type="date" 
                  value={newEvent.end_date} 
                  onChange={(e) => setNewEvent({...newEvent, end_date: e.target.value})}
                />
              </div>
              
              {!newEvent.all_day && (
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input 
                    id="end-time" 
                    type="time" 
                    value={newEvent.end_time} 
                    onChange={(e) => setNewEvent({...newEvent, end_time: e.target.value})}
                  />
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateEvent}>Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewEventsOpen} onOpenChange={setIsViewEventsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Events on {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </DialogTitle>
            <DialogDescription>
              {dateEvents.length} event(s) scheduled for this day
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {dateEvents.map(event => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-muted-foreground mt-2">{event.description}</p>
                  )}
                  
                  <div className="flex items-center mt-4 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {event.all_day ? 
                        'All day' : 
                        `${format(parseISO(event.start_time), 'h:mm a')} - ${format(parseISO(event.end_time), 'h:mm a')}`
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEventsOpen(false)}>Close</Button>
            <Button onClick={() => {
              setIsViewEventsOpen(false);
              handleAddEvent();
            }}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
