export default function Timetable({ schedule }) {
  if (!schedule) {
    return <div>준비된 시간표가 없습니다</div>;
  }
  console.log('schedule', schedule); // schedule 데이터 확인

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dayKeys = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const daseTimes = [];
  for (let i = 6; i < 22; i++) {
    daseTimes.push(`${String(i).padStart(2, '0')}:00`);
  }
  console.log('daseTimes', daseTimes); // daseTimes 데이터 확인

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
          {schedule.map(({ startTime, endTime, days }, idx) => (
            <tr key={idx} className="even:bg-gray01/50">
              <td className="border p-1">
                {startTime} ~ {endTime}
              </td>
              {/*   {dayKeys.map((key, index) => (
                 <td key={index} className={`border p-1 ${dayOfWeek ? 'bg-blue01/15' : ''}`}>
                   {'자유 수영' || ''}
                 </td>
               ))} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
