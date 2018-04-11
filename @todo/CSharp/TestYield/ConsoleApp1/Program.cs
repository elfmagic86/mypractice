using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("hi");

            var emul = TestList().GetEnumerator();

            Console.WriteLine("START:manually--");
            Console.WriteLine(emul.Current);
            emul.MoveNext();
            Console.WriteLine(emul.Current);
            emul.MoveNext();
            Console.WriteLine(emul.Current);
            emul.MoveNext();
            Console.WriteLine(emul.Current);
            emul.MoveNext();
            Console.WriteLine(emul.Current);

            Console.WriteLine("END:manually--");
            Console.WriteLine();

            Console.WriteLine("START:while----");
            var emul2 = TestList().GetEnumerator();
            while (emul2.MoveNext())
            {
                Console.WriteLine(emul2.Current);
            }

            Console.WriteLine("END:while----");

            Console.WriteLine("-----------------------------------------------------------------------------------------");
            var test2 = TestList2().GetEnumerator();
            test2.MoveNext();
            Console.WriteLine(test2.Current);
            test2.MoveNext();
            Console.WriteLine(test2.Current);


            Console.WriteLine("bye");
            Console.ReadKey();
        }

        static IEnumerable<String> TestList()
        {
            yield return "start-TestList";

            var str = "!!";
            var i = 5;
            while ( --i > 0 )
            {
                str += "center" + i + ", ";
                yield return str;
                
            }

            yield return "end-TestList";
            
        }

        static IEnumerable<String> TestList2()
        {
            yield return "TestList2-start";
            yield break;

            yield return "not end";
        }


        // https://social.msdn.microsoft.com/Forums/en-US/f7a42c29-4ee6-4a3c-b346-b3718e253dc0/can-i-yield-return-await-doasync?forum=async
        
    }
}
