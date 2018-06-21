import React from 'react'
import moment from 'moment'
import { message } from 'antd'

export const Header = ({ dates, dias }) => {
  return (
    <div className="week">
      <div className="week-header hidden-sm show-lg">
        {dates.map((e, i) => (
          <div className="day row" key={i}>
            <div className="col-12 day-row">
              <b>{dias[i].name}</b>
              <br />
              <b>{moment(e).format('DD MMMM')}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Body = ({ clases, dates, dias, eventHandler }) => {
  // // console.log('dias', dias)
  return (
    <div className="week week-events">
      {dates.map((e, i) => (
        <div className="day row" key={i}>
          <div className="col-12 hidden-lg day-row show-sm">
            <b>{dias[i].name}</b>
            <br />
            <b>{moment(e).format('DD MMMM')}</b>
          </div>
          <div
            className={`col-12 ${moment().format('DD MMMM') ===
              moment(e).format('DD MMMM') && 'today'}`}
          >
            <div className="row">
              {dias[i].events.length > 0 ? (
                dias[i].events.map((ev, j) => {
                  const future = new Date(ev.fecha) >= new Date()
                  return (
                    <div
                      className={`col-12 day-event fade ${clases.has(ev.id) &&
                        'active'} ${!future && 'disabled'}`}
                      onClick={() =>
                        future
                          ? eventHandler(ev)
                          : message.info('Esta clase ya se venció')
                      }
                      key={j}
                    >
                      <b>{ev.title}</b> <br />
                      <span>{ev.profesor.nombre}</span>
                      <br />
                      <span>
                        {ev.hora_inicio} - {ev.hora_fin}
                      </span>
                      {ev.salon && (
                        <React.Fragment>
                          <br />
                          <span>Salón: {ev.salon}</span>
                        </React.Fragment>
                      )}
                    </div>
                  )
                })
              ) : (
                <span
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  No hay eventos
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
