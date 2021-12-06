# MIDI Piano

This web app will manipulate an onscreen midi piano by using javascript to produce correct notes entered from users. The site can be reached at (Ctrl + click): [**Piano**](https://tonysn.com/piano/)

We start off our project by creating 2 eventListener, one when the key is pressed ('keydown') and the other is when the key is released ('keyup'). There is a slight problem, when we hold the key, it will fire the 'keydown' event as much as we hold it, to avoid this, we must apply a guard clause, indicated that if the event is repeat, we will **return** to exit the event.

Then we create a helper function named getNoteDetail(keyboardKey), and set up find() method, for the purpose of returning exact key that users push. Remind that when we call this helper function from 'keydown' event, our keyboardKey = event.code. Ex: if keydown = z, event.code: "KeyZ"

What if users enter a key that is not present in NOTE_DETAILS? ("O", for example) => We must include premature exit clause to 'keydown' event. Now with 'keydown' event, noteDetail.active sets to true. Conversely, at 'keyup' event, nodeDetail.active set to false, two events otherwise are very similar.

The fun part of this web app, is when we add function playNotes() to these events. This function itself, will loop through object array NOTE_DETAILS, and find an element from index file that have 'data-note' similarly to note value of the array. To make things visible, we add class "active" (customised in styles.css) to those elements by method toggle(), each key is entered will have class active, otherwise it will **return** false (to avoid all keys will be active), and if oscillator note (declare in the later function) is not null/undefined, oscillator note will stop, and disconnected. Now, we filter activeNotes from array NOTE_DETAILS, and loop each activeNote by running function startNote(), which is yet to be defined.

Now, at startNote function, 2 params declared are noteDetail and 'gain', create new instance audioContext at the very early of the script, to represent the default sound system from the browser. Read more at https://developer.mozilla.org/en-US/docs/Web/API/AudioContext. A variable oscillator is extracted from method createOscillator() of audioContext, while var gainNode is taken from method createGain(). The value of oscillator's frequency will equal to frequency property of the active note, so we don't play the same note on all the keys, while oscillator's type varies, "sawtooth", "sine", "triangle", "square", to be precise. Visit: https://musiclab.chromeexperiments.com/Oscillators/ for more visual experiment. The 'gain' param in this function, represents the gain var from playNotes function, which is calculated by dividing 1 to numbers of active note entered, for the purpose of nullifing the loudness of separate keys pressed at the same time. Now, what we do is connect oscillator to gainNode and audioContext.destination (aka our source of sound: speakers, read more at: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination), and use method start() for this oscillator, and refer oscillator of noteDetail to the var oscillator.

Hope this help you understand the project, credits to my teacher Kyle Cook©

Tony Nguyen
