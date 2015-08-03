package hatena.intern

import hatena.intern.helper._

class Exercise3Spec extends UnitSpec {
  describe("LTSV Counter") {

    val logs = LtsvParser.parse("../sample_data/log.ltsv") // リポジトリ内の`sample_data/log.ltsv`へのパスを指定してください

    it("エラー数が正しくカウントされていること") {
      LogCounter(logs).countError shouldBe 2
    }

    it("ユーザごとにログがグループ化されていること") {
      val groupdLogs = LogCounter(logs).groupByUser
      val franksLogs = groupdLogs.get("frank").getOrElse(List())
      println(franksLogs)

      groupdLogs.get("john").getOrElse(List()).size shouldBe 1
      groupdLogs.get("guest").getOrElse(List()).size shouldBe 1

      franksLogs.size shouldBe 3
      // ただしくグルーピングされているかどうかを検査するテストの続きを書いてみてください

      franksLogs.count((log) => log.path == "/apache_pb.gif") shouldBe 2

      groupdLogs.filter((group) => {
        val (user, logs) = group
        logs.find((log) => log.status == 200).isDefined
      }).size shouldBe 2
    }
  }

}
