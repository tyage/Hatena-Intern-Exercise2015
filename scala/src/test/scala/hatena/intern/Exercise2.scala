package hatena.intern

import hatena.intern.helper._

class Exercise2Spec extends UnitSpec {

  describe("LTSV Parser") {
    it("LTSVファイルが正しくパースされていること") {
      val logs = LtsvParser.parse("../sample_data/log.ltsv") // リポジトリ内の`sample_data/log.ltsv`へのパスを指定してください
      logs.size shouldBe 5

      // 以降ファイルが正しくLogクラスにパースされているテストを書いてみてください
      logs.head.uri shouldBe "http://127.0.0.1/apache_pb.gif"
      logs.tail.head.uri shouldBe "http://127.0.0.1/apache_pb.gif"
      logs.foreach(_.method shouldBe "GET")
    }

    it("LTSVファイルが正しくパースできない形式の場合") {
      // エラーハンドリングの設計を考えながら、テストを書いてみてください
    }

    it("LTSVファイルが存在しない場合") {
      // エラーハンドリングの設計を考えながら、テストを書いてみてください
      intercept[LtsvFileNotFoundExcepion] {
        LtsvParser.parse("somefilethatnotexists")
      }
    }
  }

}
