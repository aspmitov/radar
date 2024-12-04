function Echo () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P0, 0)
    echo = Math.constrain(Math.round(pins.pulseIn(DigitalPin.P14, PulseValue.High) / 58), 0, 100)
    return echo
}
let echo = 0
OLED12864_I2C.init(60)
music.setBuiltInSpeakerEnabled(false)
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
let servo = 0
let direction = 0
let sound = 0
basic.forever(function () {
    if (direction == 0) {
        servo += 10
        pins.servoWritePin(AnalogPin.P1, servo)
        basic.pause(10)
        while (Echo() <= 20) {
            basic.showLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . . . .
                . . # . .
                `)
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
    if (servo == 180) {
        direction = 1
    }
    if (direction == 1) {
        servo += -10
        pins.servoWritePin(AnalogPin.P1, servo)
        basic.pause(10)
        while (Echo() <= 20) {
            basic.showLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . . . .
                . . # . .
                `)
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
    if (servo == 0) {
        direction = 0
    }
})
basic.forever(function () {
    OLED12864_I2C.hline(
    0,
    pins.map(
    servo,
    0,
    180,
    0,
    32
    ),
    pins.map(
    echo,
    0,
    20,
    0,
    64
    ),
    1
    )
    basic.pause(100)
})
