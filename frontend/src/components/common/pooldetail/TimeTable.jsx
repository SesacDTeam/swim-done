export default function Timetable() {
  const schedule = [
    { time: '06:00-06:50', days: { MON: '자유 수영' } },
    { time: '06:00-06:50', days: { SAT: '자유 수영' } },
    { time: '07:00-07:50', days: { SAT: '자유 수영' } },
    { time: '08:00-08:50', days: { SAT: '자유 수영' } },
    { time: '09:00-09:50', days: { SAT: '자유 수영' } },
    { time: '10:00-10:50', days: { SAT: '자유 수영' } },
    { time: '11:00-11:50', days: { SAT: '자유 수영' } },
    { time: '12:00-12:50', days: { SAT: '자유 수영', SUN: '자유 수영' } },
    {
      time: '13:00-13:50',
      days: { TUE: '자유 수영', WED: '자유 수영', THU: '자유 수영', FRI: '자유 수영' },
    },
    { time: '14:00-14:50', days: {} },
    { time: '15:00-15:50', days: { THU: '자유 수영' } },
    { time: '16:00-16:50', days: { THU: '자유 수영' } },
    { time: '17:00-17:50', days: {} },
    { time: '18:00-18:50', days: {} },
    { time: '19:00-19:50', days: { TUE: '자유 수영', WED: '자유 수영' } },
  ];

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dayKeys = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="overflow-x-auto p-3">
      <table className="table-auto border-collapse border w-full text-center">
        <thead>
          <tr className="bg-blue01/70">
            <th className="border p-2">구분</th>
            {days.map((day, index) => (
              <th key={index} className="border p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, idx) => (
            <tr key={idx} className="even:bg-gray01/50">
              <td className="border p-1">{slot.time}</td>
              {dayKeys.map((key, index) => (
                <td key={index} className={`border p-1 ${slot.days[key] ? 'bg-blue01/15' : ''}`}>
                  {slot.days[key] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
