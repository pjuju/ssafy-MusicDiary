import DetailDiary from "../diary/DetailDiary";

const MainMonth =() => {
    const dummyList = [
        {
          id : 1,
          title: '떡볶이 최고',
          content : '영화관 가고 싶다',
          emotion: 4,
          created_date: new Date().getTime()
        },
        {
          id: 2,
          title: '박재범',
          content: '원소주 원해',
          emotion: 5,
          created_date: new Date()
        },
        {
            id: 3,
            title: '박재범',
            content: '원소주 원해',
            emotion: 5,
            created_date: new Date()
          },
          {
            id: 4,
            title: '박재범',
            content: '원소주 원해',
            emotion: 5,
            created_date: new Date()
          },
      ]
    return (
    <div className="main-month">
        <h2>하이하이</h2>
        {dummyList.map((it)=> (
          <DetailDiary key={it.id} {...it}>
          </DetailDiary>
        ))}
        <div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    </div>)
}

export default MainMonth;