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
                  let active = null
                  let clase = false
                  if (clases.has(ev.id)) {
                    clase = clases.get(ev.id)
                    active = clase.status
                  }
                  const cola = ev.cupo === ev.inscritos_numero ? true : false
                  const future = moment(ev.fin) >= moment()
                  return (
                    <div
                      className={`col-12 day-event fade ${
                        active === 1
                          ? 'active-reservada'
                          : active === 3
                          ?  'mimimi'
                          : active === 4
                          ? 'active'
                          : ''
                      } ${!future && 'disabled'}
                      ${cola && 'full'}`}
                      onClick={() =>
                        future
                          ? eventHandler(ev, cola, active === 3 && !cola)
                          : message.info('Esta clase ya se venció')
                      }
                      key={j}
                    >
                      <b>{ev.clase.nombre}</b> <br />
                      <span>{ev.instructor.nombre}</span>
                      <br />
                      <span>
                        {moment(ev.inicio).format('LT')} -{' '}
                        {moment(ev.fin).format('LT')}
                      </span>
                      {ev.salon && (
                        <React.Fragment>
                          <br />
                          <span>Salón: {ev.salon.nombre}</span>
                          <br />
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
