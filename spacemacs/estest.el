
(+ 1 1)

; https://github.com/syl20bnr/spacemacs/tree/master/layers/%2Blang/emacs-lisp
(defun helloworld (name)
	(let ((n (subroutine name)))
		(message (format "Hello World, %s!" name))))

(defun subroutine (s)
	(concat "my dear " s))

(helloworld "SpacEmacS")
