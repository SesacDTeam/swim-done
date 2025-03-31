export default function Timetable({ schedule }) {
  if (!schedule || !schedule.length) {
    return (
      <>
        <div className="text-body01 font-bold">준비된 시간표가 없습니다</div>
        <hr className="m-2" />
      </>
    );
  }
  console.log('schedule', schedule); // schedule 데이터 확인

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dayKeys = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const baseTimes = []; // 06:00 ~ 21:00
  for (let i = 6; i < 22; i++) {
    baseTimes.push({ [`${String(i).padStart(2, '0')}:00`]: null });
  }

  baseTimes.forEach((baseTime, idx) => {
    const time = Object.keys(baseTime)[0];
    const scheduleItem = schedule.find((item) => item.startTime === time);
    if (scheduleItem) {
      baseTimes[idx] = { [time]: scheduleItem.days };
    } else {
      baseTimes[idx] = { [time]: {} };
    }
  });
  console.log('baseTimes', baseTimes); // baseTimes 데이터 확인

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
          {baseTimes.map((item) =>
            Object.entries(item).map(([baseTime, days], idx) => (
              <tr key={idx} className="even:bg-gray01/50">
                <td className="border p-1">
                  {baseTime} ~ {baseTime.replace('00', '50')}
                </td>
                {dayKeys.map((day, index) => (
                  <td key={index} className={`border p-1 ${days[day] ? 'bg-blue01/15' : ''}`}>
                    {days[day] || ''}
                  </td>
                ))}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
